"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { getUserProfile, updateUserProfile, type UserProfile } from "@/services/profile";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  reloadProfile: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  reloadProfile: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const reloadProfile = useCallback(async () => {
    if (user) {
      let userProfile = await getUserProfile(user.uid);
       if (!userProfile) {
        const newProfileData = {
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
        };
        await updateUserProfile(user.uid, newProfileData);
        userProfile = await getUserProfile(user.uid);
      }
      setProfile(userProfile);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        let userProfile = await getUserProfile(user.uid);
        if (!userProfile) {
            // If profile doesn't exist, create it
            const newProfileData = {
                uid: user.uid,
                displayName: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || "",
            };
            await updateUserProfile(user.uid, newProfileData);
            userProfile = await getUserProfile(user.uid);
        }
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAppRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/community") || pathname.startsWith("/events") || pathname.startsWith("/resources") || pathname.startsWith("/profile") || pathname.startsWith("/messaging");

    if (!user && isAppRoute) {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  useEffect(() => {
    if (user && profile && user.displayName !== profile.displayName) {
        setProfile(prev => prev ? { ...prev, displayName: user.displayName || '' } : null);
    }
  }, [user, profile]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, reloadProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

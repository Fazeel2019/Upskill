
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

    const isAppRoute = !["/", "/login", "/signup", "/about", "/blog", "/global-impact", "/courses"].some(p => {
        // Handle dynamic routes like /blog/[blogId] or /courses/[courseId]
        if (p.includes('[')) {
            const baseRoute = p.substring(0, p.indexOf('['));
            return pathname.startsWith(baseRoute);
        }
        return pathname === p;
    });
    
    const isWinnerCircleRoute = ['/learning', '/exclusive-events'].some(p => pathname.startsWith(p));
    
    if (!user && (isAppRoute || isWinnerCircleRoute)) {
      router.push("/login");
      return;
    }

    if (user && profile && isWinnerCircleRoute) {
        const hasActiveMembership = profile.membership === 'winner-circle' && profile.membershipExpiresAt && profile.membershipExpiresAt.toDate() > new Date();
        if (!hasActiveMembership) {
            router.push('/winner-circle');
        }
    }

  }, [user, profile, loading, router, pathname]);

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

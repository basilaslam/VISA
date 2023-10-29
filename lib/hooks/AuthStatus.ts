import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()
  const { toast } = useToast()
  const logout = async () => {
    try {
        const res = await axios.get('/api/auth/logout')        
        setIsLoggedIn(false)
        router.push("/login")
    } catch (error) {
        toast({
            title: "logout failed",
            description: 'something went wrong while logging out',
            variant: "destructive"
        })
    }
  }

  const checkLoggedIn = async () => {
    try {
        const res: any = await axios.get("/api/me")
 
        setIsLoggedIn(true);
 
     } catch (error) {
         console.log('error');
         
         setIsLoggedIn(false);
     }
  }

  useEffect(() => {
    checkLoggedIn()
  }, []);

  return {isLoggedIn,
          logout};
}
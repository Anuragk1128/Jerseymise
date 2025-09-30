// components/auth/GoogleLoginButton.tsx
'use client';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';
import { loginWithGoogle } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function GoogleLoginButton() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error('No credential received from Google');
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginWithGoogle(credentialResponse.credential);
      
      if (result.success && result.data) {
        const { token, user } = result.data;
        login(user.email, token);
        toast.success('Logged in successfully!');
        router.push('/');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to login with Google');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('An error occurred during Google login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.error('Google login error occurred');
    toast.error('Google login failed. Please try again.');
  };

  if (!mounted) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xs">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
          text="signin_with"
          shape="rectangular"
          theme="outline"
          size="large"
          width="100%"
          logo_alignment="left"
          ux_mode="popup"
        />
        {isLoading && (
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Redirecting to Google...
          </div>
        )}
      </div>
    </div>
  );
}
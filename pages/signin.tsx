import { useRouter } from 'next/router';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import LoadingDots from 'components/ui/LoadingDots';
import Logo from 'components/icons/Logo';
import { getURL } from '@/utils/helpers';

const SignIn = () => {
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    if (!user)
        return (
            <div className="flex justify-center height-screen-helper">
                <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
                    <div className="flex justify-center pb-12 ">
                        <Logo width="64px" height="64px" />
                    </div>

                    <Auth
                        supabaseClient={supabaseClient}
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        providers={['google', 'github']}
                        socialLayout="horizontal"
                        redirectTo={'/dashboard/account'}
                    />
                </div>
            </div>
        );
    else {
        <LoadingDots />;
        // router.replace('/dashboard/account');
    }
};

export default SignIn;

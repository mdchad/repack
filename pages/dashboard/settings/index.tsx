import DashboardLayout from '@/components/Layout/DashboardLayout';
import SettingNavBar from '@/components/ui/Setting/Navbar';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    useUser,
    useSession,
    useSupabaseClient,
    useSessionContext
} from '@supabase/auth-helpers-react';
import { Database } from 'types_db';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Profiles = Database['public']['Tables']['users']['Row'];

function settings() {
    const router = useRouter();
    const pageName = 'Settings';
    const { session, error } = useSessionContext();
    const supabase = useSupabaseClient();
    const user = useUser();

    const [loading, setLoading] = useState(true);
    const [full_name, setFullName] = useState<Profiles['full_name']>(null);
    const [email, setEmail] = useState('');
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

    function notify(msg: string, type: 'success' | 'error' | 'warning') {
        const duration = 2000;

        if (type === 'success') {
            toast.success(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (type === 'error') {
            toast.error(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            }
            );
        }
    }

    function notify(msg: string, type: 'success' | 'error' | 'warning') {
        const duration = 2000;

        if (type === 'success') {
            toast.success(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (type === 'error') {
            toast.error(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast(msg, {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            }
            );
        }
    }

    useEffect(() => {
        if (user) {
            getProfile()

            if (session) {
                setEmail(session?.user.email || '')
            }
        }
    }, [user])

    async function getProfile() {
        try {
            setLoading(true);
            if (!user) throw new Error('No user');

            let { data, error, status } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFullName(data.full_name);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert('Error loading user data!');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        full_name,
        avatar_url
    }: {
        full_name: Profiles['full_name'];
        avatar_url: Profiles['avatar_url'];
    }) {
        try {
            setLoading(true);
            if (!user) throw new Error('No user');

            const updates = {
                id: user.id,
                full_name,
                avatar_url: avatar_url,
                updated_at: new Date().toISOString()
            };

            let { error } = await supabase.from('users').upsert(updates);

            if (error) throw error;

            notify('Profile updated!', 'success')
        } catch (error) {
            notify('Error updating profile!', 'error')
            // console.log(error)
        } finally {
            setLoading(false)
        }
    }
}

return (
    <section className="xl:w-2/3 flex flex-col gap-4">

        <div className="">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageName}</h1>
        </div>

        <SettingNavBar />

        <div className="bg-gray border p-5 w-full rounded-lg overflow-hidden">
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="full_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Full Name
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id="full_name"
                            value={full_name || ''}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email address
                        </label>
                        <input
                            className="disabled:opacity-75 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="email"
                            id="email"
                            value={email || ''}
                            placeholder=""
                            disabled
                        />
                    </div>
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => updateProfile({ full_name, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </form>
        </div>
    </section>
);
}

export default settings;

settings.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

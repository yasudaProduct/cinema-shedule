import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";


export default function useUser() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log('authListener');
                console.log(event, session);
                setSession(session);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // function signInWithGithub() {
    //     supabase.auth.signIn({ provider: "github" });
    // }

    function signIn(email: string, password: string) {
        supabase.auth.signInWithPassword({
            email,
            password,
        });
    }

    function signOut() {
        supabase.auth.signOut();
    }

    return {
        session,
        signIn,
        signOut,
    };
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/challenges-list');
    }, [router]);

    return <div>Open Challenge</div>;
}

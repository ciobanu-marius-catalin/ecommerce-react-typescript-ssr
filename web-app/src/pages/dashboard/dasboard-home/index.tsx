import { DashboardLayout } from '@/layouts';
import { axios } from '@/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DashboardHome = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const fetch = async () => {
    try {
      const data = await axios.get('/admin/posts');
      setPosts(data?.data);
    } catch (e) {
      if (e?.errorCode === 401) {
        router.push('/logout');
      }
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <h1>Hello world dashboard</h1>
      {posts}
    </div>
  );
};

DashboardHome.getLayout = DashboardLayout;

export { DashboardHome };

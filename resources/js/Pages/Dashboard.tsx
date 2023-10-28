import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Document, PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react';
import {FC,useEffect} from 'react'
import { APP_NAME } from './Welcome';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';


const Dashboard:FC = () => {

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 500, pv: 2500, amt: 2500}];

    return (
        <>
            <Head title='Dashboard' />
            <DashboardLayout >
                <div className='h-full flex flex-col items-center justify-center space-y-3.5'>
                    <div className='w-1/2'>
                        <RenderLineChart linedata={data}/>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;

const RenderLineChart:FC<{linedata:{"name":string; "uv":number; "pv":number; "amt":number;}[]}> = ({linedata}) => {
    return (
        <ResponsiveContainer>
            <LineChart width={600} height={300} data={linedata}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
  );}

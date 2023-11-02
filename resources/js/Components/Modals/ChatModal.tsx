import React, { FC, useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useSettings } from '@/Hooks/useSettings'
import { Label } from '../ui/label'
import { ModeToggle } from '../ModeToggle'
import { APP_NAME } from '@/Pages/Welcome'
import { useChatbotModal } from '@/Hooks/useChatbotModal'
import { cn } from "@/lib/utils"
import { Bot } from 'lucide-react';

const ChatModal:FC = () => {
    const {isOpen,onClose} = useChatbotModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='border-b pb-2.5'>
                        <span className='text-lg font-medium'>Koji Bot</span>
                    </DialogTitle>
                </DialogHeader>
                <div className='py-2 text-sm max-h-[20rem] flex flex-col overflow-hidden'>
                    <div className='flex flex-col-reverse overflow-y-auto z-40'>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                        <p>Hello World</p>
                    </div>
                </div>
                {/* <RenderData /> */}
            </DialogContent>
        </Dialog>
    )
}

export default ChatModal

const RenderData:FC = () => {

    const dataList = [
        {title: 'How do you prevent a situation from getting too stressful to manage?',
        description: "I prioritize tasks, break them into manageable steps, and ensure clear communication with my team. Regular breaks and mindfulness exercises also help."},
        {title: 'How would you respond if your manager gave you negative feedback in front of your peers?',
        description: "I would listen calmly, ask for specific examples, and request a private meeting to discuss further. It’s essential to focus on improvement rather than reacting defensively."}];

    const [messages, setMessages] = useState(dataList.map(data=>({isOptions:true, isUser:false, message:data.title})))
    const [isThinking, setIsThinking] = useState(false);

    const selectTitle = (msg:{isOptions:boolean,isUser:boolean,message:string}) =>{
        const found = dataList.find(f=>f.title==msg.message);
        setMessages(m=>([{isOptions:false,isUser:true,message:msg.message},...m]));

        if (found){
            const ss = setTimeout(() => {
                setMessages(m=>([{isOptions:false,isUser:false,message:found.description},...m]));
                setMessages(m=>([{isOptions:true,isUser:false,message:"menu"},...m]));
                clearTimeout(ss);
            }, 1000);
        }else{
            const ss = setTimeout(() => {
                setMessages(m=>([{isOptions:false,isUser:false,message:"Sorry, I did not get that"},...m]));
                clearTimeout(ss);
            }, 1000);
        }
    }

    const loadMenu = () => {
        const ss = setTimeout(() => {
            const newMessages = dataList.map(data => ({ isOptions: true, isUser: false, message: data.title }));
            setMessages([...newMessages,...messages]);
            clearTimeout(ss);
        }, 1000);
    }

    return (
        <div className='py-2 text-sm h-full max-h-[20rem] overflow-y-auto flex flex-col-reverse space-y-1.5 space-y-reverse'>
            {
            (messages).map(msg =>
                !msg.isOptions?
                <p key={Math.floor(Math.random()*9999)}
                    className={cn('w-fit max-w-md p-4 rounded-lg dark:invert shadow',
                                    msg.isUser?'ml-auto bg-blue-200':'bg-white')}>
                    {msg.message}
                </p>
                :
                <button key={Math.floor(Math.random()*9999)} onClick={() => (msg.message!="menu")?selectTitle(msg):loadMenu()}
                    className='shadow text-blue-600 text-sm w-fit max-w-md text-left rounded-full px-4 py-1 dark:invert border border-blue-300'>
                        {msg.message}
                </button>
                )
            }
        </div>
    );
}

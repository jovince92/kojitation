import { cn } from '@/lib/utils';
import { ChevronLeft, MenuIcon, Plus, PlusCircle, Recycle, Search, Settings, LineChart } from 'lucide-react'
import React, { ElementRef, FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import {useMediaQuery}  from 'usehooks-ts';
import UserNav from '../UserNav';
import UserItem from './UserItem';
import Item from './Item';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import DocumentList from './DocumentList';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Trashbox from './Trashbox';
import { useSearch } from '@/Hooks/useSearch';
import { useSettings } from '@/Hooks/useSettings';
import NavBar from '../DocumentViewComponents/NavBar';
import { format } from 'date-fns';
const Navigation:FC = () => {


    const {selected_document} = usePage<PageProps>().props;
    const {documents} = usePage<PageProps>().props;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<'aside'>>(null);
    const navBarRef = useRef<ElementRef<'div'>>(null);
    const [isResetting,setIsResetting] = useState(false);
    const [isCollapsed,setIsCollapsed] = useState(isMobile);
    const {onOpen} = useSearch();
    const {onOpen:openSettings} = useSettings();

    const handleMouseDown:MouseEventHandler<HTMLDivElement> = e =>{
        e.preventDefault();
        e.stopPropagation();



        isResizingRef.current=true;
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);

    }

    const handleMouseMove = (e:MouseEvent) =>{
        if(!isResizingRef.current) return;
        let newWidth = e.clientX;
        if(newWidth < 240) newWidth = 240;
        if(newWidth > 480) newWidth = 480;

        if(sidebarRef.current && navBarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty('left', `${newWidth}px`);
            navBarRef.current.style.setProperty('width', `calc(100% - ${newWidth})px`)
        }

    }

    const handleMouseUp = () =>{
        isResizingRef.current=false;
        document.removeEventListener('mousemove',handleMouseMove);
        document.removeEventListener('mouseup',handleMouseUp);
    }

    const resetWidth = () =>{
        if(sidebarRef.current && navBarRef.current){
            setIsResetting(true);
            setIsCollapsed(false);
            sidebarRef.current.style.width = isMobile? '100%' : '15rem';
            navBarRef.current.style.setProperty('width',isMobile? '0' : 'calc(100% - 15rem)');
            navBarRef.current.style.setProperty('left',isMobile? '100%':'15rem');

            setTimeout(()=>setIsResetting(false),300);
        }
    }

    const collapse = () =>{
        if(sidebarRef.current && navBarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width='0px';
            navBarRef.current.style.setProperty('width','100%');
            navBarRef.current.style.setProperty('left','0');
            setTimeout(()=>setIsResetting(false),300);
        }
    }

    useEffect(()=>{
        if (isMobile) collapse();
        else resetWidth();
    },[isMobile]);

    const handleCreate = () =>{
        router.post(route('documents.store'),{
            title:`Koji: ${format(new Date(),'Pp')}`
        },{
            onError:()=>toast.error('Something Went Wrong. Please try again....')
        });
    }

    return (
        <>
            <aside ref={sidebarRef} className={cn('group/sidebar max-h-screen overflow-hidden h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[100000] ',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'w-0'
                    )}>
                <div onClick={collapse} role='button' className={cn('h-6 w-6 text-muted-foreground rounded-sm hover:text-primary absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ',
                        isMobile && 'opacity-100'
                    )}>
                    <ChevronLeft className='h-6 w-6' />
                </div>
                <div>
                    <UserItem />
                    <Item onClick={onOpen} label='Search' Icon={Search} isSearch />
                    <Item onClick={openSettings} label='Settings' Icon={Settings}  />
                    {/* <Item onClick={handleCreate} label='New Koji' Icon={PlusCircle} /> */}
                    <Item onClick={()=>router.get(route('dashboard.index'))} label='Dashboard' Icon={LineChart} />
                </div>
                <div className='flex-1 mt-4 flex flex-col overflow-hidden'>
                    <div>Todo</div>
                    <div className='h-auto'>
                        <Item onClick={handleCreate} Icon={Plus} label='Add a Koji' />
                        <Popover>
                            <PopoverTrigger className='w-full'>
                                <Item label='Archives' Icon={Recycle} />
                            </PopoverTrigger>
                            <PopoverContent className='p-0 w-72' side={isMobile?'bottom':'right'}>
                                <Trashbox />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        <DocumentList documents={documents} />
                    </div>
                </div>
                <div className='flex-1 mt-4 flex flex-col overflow-hidden'>
                    <div>Journal</div>
                    <div className='h-auto'>
                        <Item onClick={handleCreate} Icon={Plus} label='Add a Koji' />
                        <Popover>
                            <PopoverTrigger className='w-full'>
                                <Item label='Archives' Icon={Recycle} />
                            </PopoverTrigger>
                            <PopoverContent className='p-0 w-72' side={isMobile?'bottom':'right'}>
                                <Trashbox />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        <DocumentList documents={documents} />
                    </div>
                </div>
                <div onMouseDown={handleMouseDown} onClick={resetWidth} className='hopacity-0 hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary right-0 top-0' />
            </aside>
            <div ref={navBarRef} className={cn('absolute top-0 z-[100000] left-60 w-[calc(100%-15rem)]',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'left-0 w-full'
                )}>
                {!!selected_document?.id?<NavBar isCollapsed={isCollapsed} onResetWidth={resetWidth} />:(
                    <nav className='bg-transparent px-3 py-2 w-full'>
                        {isCollapsed&& <MenuIcon onClick={resetWidth} className='h-6 w-6 text-muted-foreground' role='button' />}
                    </nav>
                )}

            </div>
        </>
    )
}

export default Navigation
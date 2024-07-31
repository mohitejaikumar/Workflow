"use client";
import {Drawer, Dropdown, Input, MenuProps, message, Space, Typography} from "antd";
import Image from "next/image";
import { closeDrawer } from "workflo/redux/features/drawer";
import { useAppDispatch, useAppSelector } from "workflo/redux/hooks";
import ShareIcon from "../../public/share.svg";
import FavouriteIcon from "../../public/favourite.svg";
import StatusIcon from "../../public/status.svg";
import PriorityIcon from "../../public/priority.svg";
import DeadlineIcon from "../../public/deadline.svg";
import DescriptionIcon from "../../public/description.svg";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "../utils/zod";
import { z } from "zod";
import { Form, Button, Select, DatePicker } from 'antd';
import { useEffect } from "react";
import moment from 'moment';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useSession } from "next-auth/react";
import { addTodo } from "workflo/redux/features/todos";
import { useToast } from "./ui/use-toast";
import { CircleCheck, CircleX } from "lucide-react";
const { Option } = Select;

const validateDeadline = (_:any, value:any) => {
    if (!value || value.isAfter(moment())) {
    return Promise.resolve();
    }
    return Promise.reject(new Error('Deadline must be a date and time in the future.'));
};


export default function TodoDrawer(){
    const drawerState = useAppSelector(state=>state.drawer);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const {data:session}=useSession();
    const {toast} = useToast();


    async function onSubmit(values: any) {
        try{
            
            values.deadline = values.deadline.toDate();
            values.createdDate = new Date();
            const safeParse = formSchema.safeParse(values);
            if(!safeParse.success){
                message.error(safeParse.error.errors[0].message);
            }
            else{
                try{
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/create`,values,{
                        headers:{
                            //@ts-ignore
                            Authorization:`${session?.user?.jwtToken}`,
                        }
                    });
                    toast({
                        title: (
                            <div className=" flex gap-2 items-center font-bold z-10">
                                <CircleCheck color="#05ff50" />
                                Successful
                            </div>
                        ) as any,
                        duration:5000,
                        description: `Todo created successfully`,
                    });
                    dispatch(addTodo(res.data.todo));
                }
                catch(error){
                    message.error("SERVER ERROR");
                    toast({
                        title: (
                        <div className=" flex gap-2 items-center font-bold">
                            <CircleX color="#ff1f1f" />
                            Error
                        </div>
                        ) as any,
                        duration:5000,
                        description: `Something went wrong`,
                    });
                    console.error("Error occurred:", error);
                }
            
            }
        }
        catch(e){
            message.error("Please enter a valid Title and Status");
        }
        
    }

    useEffect(()=>{
        form.setFieldsValue({
            status: drawerState.status,
            title:"",
            description:"",
            date:"",
        });
        
    },[drawerState.status])
    
    return (
        <div>
            <Drawer
            open={drawerState.isActive}
            onClose={()=>dispatch(closeDrawer())}
            width={500}
            extra={
                <Space>
                    <div className="flex gap-3">
                        <div className="flex gap-2 px-2 py-1 rounded-md bg-[#edecf5fa] cursor-pointer">
                            <div>Share</div>
                            <Image src={ShareIcon} alt="share" />
                        </div>
                        <div className="flex gap-2 px-2 py-1 rounded-md bg-[#edecf5fa] cursor-pointer">
                            <div>Favourite</div>
                            <Image src={FavouriteIcon} alt="favourite" />
                        </div>
                    </div>
                </Space>
            }
            >
                
                <Form
                form={form}
                layout="horizontal"
                onFinish={onSubmit}
                initialValues={{
                    status: drawerState.status,
                    priority: 'Urgent'
                }}
                requiredMark={false}
                >
                <Form.Item
                    name="title"
                    
                    rules={[{ required: false, message: 'Please enter a Title' }]}
                >
                    <Input placeholder="Title" className="text-6xl font-semibold text-gray-300 border-none outline-none mb-5"/>
                    
                </Form.Item>
                <Form.Item
                    name="status"
                    label={
                        <div className="flex gap-3">
                            <Image src={StatusIcon} alt="status"  />
                            <div className="text-lg">Status</div>
                        </div>
                    }
                    rules={[{ required: true, message: 'Please select a status' }]}
                >
                    <Select >
                    <Option value="To do">To do</Option>
                    <Option value="Under review">Under review</Option>
                    <Option value="In progress">In progress</Option>
                    <Option value="Finished">Finished</Option>
                    {/* <Option value="Not Selected">Not Selected</Option> */}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="priority"
                    label={
                        <div className="flex gap-3">
                            <Image src={PriorityIcon} alt="priority"  />
                            <div className="text-lg">Priority</div>
                        </div>
                    }
                    rules={[{ required: true, message: 'Please select a priority' }]}
                >
                    <Select>
                    <Option value="Urgent">Urgent</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="deadline"
                    label={
                        <div className="flex gap-3">
                            <Image src={DeadlineIcon} alt="deadline"  />
                            <div className="text-lg">Deadline</div>
                        </div>
                    }
                    rules={[
                        { required: true, message: 'Please select a deadline' },
                        { validator: validateDeadline }
                    ]}
                    
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="description"
                    label={
                        <div className="flex gap-3">
                            <Image src={DescriptionIcon} alt="description"  />
                            <div className="text-lg">Description</div>
                        </div>
                    }
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <TextArea rows={4} placeholder="Enter description here" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="flex  bg-custom-blue-gradient">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
                
            </Drawer>
        </div>
    )
}
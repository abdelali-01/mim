'use client';

import { User } from '@/components/auth/SignUpForm'
import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button'
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    account: User;
    closeModal: () => void;
}

export default function AccountModal({ account, closeModal }: Props) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const { user } = useSelector((state: RootState) => state.auth);

    const [userInfo, setUserInfo] = useState<User>(account);

    const changeHandler = (e)=>{
        setUserInfo((prev)=> ({...prev , [e.target.name] : e.target.value}));
    }


    useEffect(() => {
        if (user && user._id == account._id) {
            setIsDisabled(false)
        } else setIsDisabled(true);
    }, [user, account]);

    const handleSave = () => {
        console.log('saving ...');
        
    }
    return (
        <form className="">
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Account Information
            </h4>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-1">
                    <Label>Username</Label>
                    <Input type="text" name='username'  placeholder="Username" value={userInfo.username} required
                    onChange={changeHandler}
                    disabled={isDisabled} />
                </div>

                <div className="col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" name='phone' onChange={changeHandler} placeholder="phone number" value={userInfo.phone} disabled={isDisabled}  required/>
                </div>

                <div className="col-span-1">
                    <Label>Email</Label>
                    <Input type="email" name='email' onChange={changeHandler} placeholder="example@gmail.com" value={userInfo.email} disabled={isDisabled}  required/>
                </div>

                <div className="col-span-1">
                    <Label>Role</Label>
                    <Select options={[
                        { value: 'super', label: 'Super admin' },
                        { value: 'sub-super', label: 'Sub Super admin' },
                        { value: 'manager', label: 'Manager' },
                        { value: 'reader', label: 'Reader' },
                    ]}
                        defaultValue={userInfo.role}
                          onChange={(value) => {
                            setUserInfo(prev => ({ ...prev, role: value }))
                          }}
                        required={true}
                        disabled={user?.role !== 'super'}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end w-full gap-3 mt-6">
                <Button size="sm" variant="outline" onClick={closeModal}>
                    Close
                </Button>
                <Button size="sm" onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </form>
    )
}

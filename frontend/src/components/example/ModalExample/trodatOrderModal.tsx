'use client';

import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button'
import { AppDispatch, RootState } from '@/store/store';
import { updateTrodatRegisterPage } from '@/store/trodat-register/trodatRegisterHandler';
import { TrodatOrder } from '@/store/trodat-register/trodatRegisterSlice';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    dataOrder?: TrodatOrder;
    closeModal: () => void;
}

export default function TrodatOrderModal({ dataOrder, closeModal }: Props) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [quantityError, setQuantityError] = useState<string>('');
    const orderState = {
        destination: '',
        model: '',
        quantity: 1,
        prePayment: 0,
        price: undefined,
        total: 0,
        phone: '',
        isCompleted: false,
        isDelivered: false
    }

    const [orderInfo, setOrderInfo] = useState<TrodatOrder>(orderState);
    const [prevPrePayment, setPrevPrePayment] = useState<number | undefined>();
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const { pageId } = useParams();

    const { stockTable } = useSelector((state: RootState) => state.trodatRegister);

    useEffect(() => {
        if (dataOrder) {
            setOrderInfo(dataOrder);
            setIsCheked({
                complete: dataOrder.isCompleted,
                paid: dataOrder.prePayment === (dataOrder.quantity || 1) * (dataOrder.price || 0),
                delivered: dataOrder.isDelivered,
            });
            setPrevPrePayment(dataOrder.prePayment);
        } else {
            setOrderInfo(orderState);
            setIsCheked({ complete: false, paid: false, delivered: false });
            setPrevPrePayment(undefined);
        }
    }, [dataOrder]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrderInfo((prev) => {
            const newState = { ...prev, [name]: value };
            
            // Validate quantity when it changes
            if (name === 'quantity') {
                const quantity = parseInt(value);
                const selectedModel = stockTable?.table?.find(item => item.model === newState.model);
                
                if (selectedModel && quantity > selectedModel.quantity) {
                    setQuantityError(`Warning: Only ${selectedModel.quantity} items available in stock`);
                } else {
                    setQuantityError('');
                }
            }
            
            return newState;
        });
    }

    useEffect(() => {
        if (user && user.role === 'manager') {
            setIsDisabled(true)
        } else setIsDisabled(false);
    }, [user, dataOrder]);

    const [isChecked, setIsCheked] = useState({
        complete: false,
        paid: false,
        delivered: false
    });

    useEffect(() => {
        setOrderInfo((prev) => {
            const total = (prev.quantity || 1) * (prev.price || 0);

            if (isChecked.paid) {
                if (prevPrePayment === undefined || prevPrePayment !== prev.prePayment) {
                    setPrevPrePayment(prev.prePayment);
                }

                return {
                    ...prev,
                    isCompleted: isChecked.complete,
                    isDelivered: isChecked.delivered,
                    prePayment: total,
                };
            } else {
                return {
                    ...prev,
                    isCompleted: isChecked.complete,
                    isDelivered: isChecked.delivered,
                    prePayment: prevPrePayment ?? 0,
                };
            }
        });
    }, [isChecked]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if quantity is valid before submitting
        const selectedModel = stockTable?.table?.find(item => item.model === orderInfo.model);
        if (selectedModel && orderInfo.quantity > selectedModel.quantity) {
            return; // Don't submit if quantity is invalid
        }

        if (dataOrder) {
            dispatch(updateTrodatRegisterPage({ pageId, updateOrder: orderInfo }));
        } else {
            dispatch(updateTrodatRegisterPage({ pageId, addOrder: orderInfo }));
        }
        closeModal();
    }

    // Generate dropdown options from stockTable.table, filtering out items with quantity <= 0
    const modelOptions = stockTable?.table
        ?.filter(item => item.quantity > 0)
        .map((item) => ({
            value: item.model,
            label: `${item.model} (${item.quantity} in stock)`,
        })) || [];

    if(!stockTable) return null;
    return (
        <form className="" onSubmit={handleSave}>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Trodat Order Information
            </h4>

            <div className='flex items-center gap-2 my-3'>
                {user?.role !== 'manager' && <Button type='button' size='sm' variant={`${isChecked.paid ? 'success' : 'light'}`} className='flex-1' startIcon={<CheckCircleIcon className='size-5' />}
                    onClick={() => setIsCheked(prev => ({ ...prev, paid: !isChecked.paid }))}
                >Paid
                </Button>}

                {dataOrder &&
                    <>
                        <Button type='button' size='sm' variant={`${isChecked.complete ? 'success' : 'light'}`} className='flex-1' startIcon={<CheckCircleIcon className='size-5' />}
                            onClick={() => setIsCheked(prev => ({ ...prev, complete: !isChecked.complete }))}
                        >Completed</Button>
                        {
                            user?.role !== 'manager' && <Button type='button' size='sm' variant={`${isChecked.delivered ? 'success' : 'light'}`} className='flex-1' startIcon={<CheckCircleIcon className='size-5' />}
                                onClick={() => setIsCheked(prev => ({ ...prev, delivered: !isChecked.delivered }))}
                            >Delivered</Button>
                        }
                    </>
                }
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
                <div className="col-span-2">
                    <Label>Destination *</Label>
                    <Input type="text" name='destination' placeholder="Destination" value={orderInfo?.destination} required
                        onChange={changeHandler}
                        disabled={isDisabled} />
                </div>
                <div className="col-span-1">
                    <Label>Model *</Label>
                    <Select
                        placeholder="Select model"
                        options={modelOptions}
                        defaultValue={orderInfo?.model}
                        required
                        onChange={(value) => {
                            const selectedModel = stockTable.table.find((item) => item.model === value);
                            if (selectedModel) {
                                setOrderInfo((prev) => ({
                                    ...prev,
                                    model: selectedModel.model,
                                    price: selectedModel.price,
                                }));
                                // Reset quantity error when model changes
                                setQuantityError('');
                            }
                        }}
                        disabled={isDisabled} />
                </div>

                <div className="col-span-2">
                    <Label>Price *</Label>
                    <Input type="number" name='price' placeholder="example : 1200 " value={orderInfo?.price} required
                        onChange={changeHandler}
                        disabled={isDisabled} />
                </div>
                <div className="col-span-1">
                    <Label>Quantity *</Label>
                    <div className="relative">
                        <Input 
                            type="number" 
                            name='quantity' 
                            placeholder="example : 2 " 
                            value={orderInfo?.quantity} 
                            required
                            onChange={changeHandler}
                            disabled={isDisabled} 
                        />
                        {quantityError && (
                            <div className="absolute -bottom-6 left-0 flex items-center text-yellow-600 text-sm">
                                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                                {quantityError}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-2">
                    <Label>Pre payment *</Label>
                    <Input type="number" name='prePayment' placeholder="l'anvance" value={isChecked.paid ? (orderInfo?.quantity || 1) * (orderInfo?.price || 0) : orderInfo?.prePayment} required
                        onChange={changeHandler}
                        disabled={isDisabled} />
                </div>
                <div className="col-span-1">
                    <Label>Total</Label>
                    <Input type="number" name='total' placeholder="total" value={(orderInfo?.quantity || 1) * (orderInfo?.price || 0)} required
                        onChange={changeHandler}
                        disabled={isDisabled} />
                </div>

                <div className="col-span-3">
                    <Label>Phone number</Label>
                    <Input
                        type="text"
                        name="phone"
                        onChange={changeHandler}
                        placeholder="phone number"
                        value={orderInfo?.phone}
                        disabled={isDisabled}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end w-full gap-3 mt-6">
                <Button size="sm" variant="outline" onClick={closeModal}>
                    Close
                </Button>
                <Button 
                    size="sm" 
                    type="submit"
                    disabled={!!quantityError}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    )
}

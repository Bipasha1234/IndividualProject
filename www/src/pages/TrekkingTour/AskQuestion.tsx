
import Axios from 'axios';
import { useState } from 'react';
import './AskQuestion.css';
import {useMutation} from "react-query";

interface ReviewData {
    messageName: string;
    messageEmail: string;
    messageNumber: string;
   messageMsg: string;

}

function AskQn() {
    const [messageName, setmessageName] = useState('');
    const [messageEmail, setmessageEmail] = useState('');
    const [messageNumber, setmessageNumber] = useState('');
    const [messageMsg, setMessage] = useState('');

    const [reviewList, setReviewList] = useState<ReviewData[]>([]);
    const [formErrors, setFormErrors] = useState({
        messageName: '',
        messageEmail: '',
        messageNumber: '',
        messageMsg: '',

    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...formErrors };

        if (!messageName) {
            newErrors.messageName = 'Full Name is required.';
            valid = false;
        } else {
            newErrors.messageName = '';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!messageEmail) {
            newErrors.messageEmail = 'Email is required.';
            valid = false;
        } else if (!emailRegex.test(messageEmail)) {
            newErrors.messageEmail = 'Enter a valid email address.';
            valid = false;
        } else {
            newErrors.messageEmail = '';
        }


        if (!messageMsg) {
            newErrors.messageMsg = 'Messages are required.';
            valid = false;
        } else {
            newErrors.messageMsg = '';
        }

        setFormErrors(newErrors);
        return valid;
    };
    const mutation = useMutation(
        (formData: ReviewData) => Axios.post('http://localhost:8081/message/save', formData, {

        }),
        {
            onSuccess: (response) => {
                console.log('Message saved successfully:', response.data);

            },
            onError: (error) => {
                console.error('Error saving message:', error);
            },
        }
    );



    const submit = () => {
        if (validateForm()) {
            mutation.mutate({
                messageName: messageName,
                messageEmail: messageEmail,
                messageNumber: messageNumber,
                messageMsg: messageMsg,
            });


            setmessageName('');
            setmessageNumber('');
            setmessageEmail('');
            setMessage('');
        }
    };
    return (
        <>
                <div className="container">
                        <div className="standard-formm ">
                            <div className="page-titlee">
                                <h1 className="customizeH11">Ask a question and our expertise will get back to you.</h1>
                            </div>

                            <div className={'name-messageEmail'}>
                                <div className="form-groupp">
                                    <label className="required">Full Name</label>
                                    <input
                                        className={`form-controll ${formErrors.messageName && 'border-red-500'}`}

                                        required
                                        value={messageName}
                                        onChange={(e) => setmessageName(e.target.value)}
                                    />
                                    {formErrors.messageName && <p className="error-message ">{formErrors.messageName}</p>}
                                </div>


                                <div className="form-groupp ">
                                    <label className="required">Email</label>
                                    <input
                                        type="text"
                                        className={`form-controll ${formErrors.messageEmail && 'border-red-500'}`}
                                        name="messageName"
                                        id="messageName"
                                        required
                                        value={messageEmail}
                                        onChange={(e) => setmessageEmail(e.target.value)}
                                    />
                                    {formErrors.messageEmail && <p className="error-message">{formErrors.messageEmail}</p>}
                                </div>



                            </div>



                                    <div className="form-groupp">
                                        <label className={'phone'}> Phone Number</label>
                                        <input
                                            className={'form-control-num' }
                                            type="text"

                                            max="15"
                                            required
                                            value={messageNumber}
                                            onChange={(e) => setmessageNumber(e.target.value)}
                                        />

                                    </div>



                            <div className="form-group ">
                                <label className="required">Message </label>
                                <textarea
                                    className={`form-controll ${formErrors.messageMsg && 'border-red-500'}`}

                                    required
                                    value={messageMsg}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={8}
                                    style={{
                                        height: '100px',
                                        fontSize: '16px',
                                        color: 'black',
                                        width:'550px'
                                    }}
                                />
                                {formErrors.messageMsg && (
                                    <p className="error-message">{formErrors.messageMsg}</p>
                                )}
                            </div>

                            <div className="button-submitt">
                                <button className="btn" onClick={submit}>
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                </div>




        </>
    );
}

export default AskQn;

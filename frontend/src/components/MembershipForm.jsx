import { useState} from "react"
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

export default function MembershipForm() {
    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');

    const [showError, setShowError] = useState(false)
    const [validNameState, setValidNameState] = useState(true)
    const [validDOBState, setValidDOBState] = useState(true)
    const [validPhoneNumberState, setValidPhoneNumberState] = useState(true)
    const [validEmailState, setValidEmailState] = useState(true)
    const [validMessageState, setValidMessageState] = useState(true)

    const [sendStatus, setSendStatus] = useState('before')
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        /*email validation*/
        var emailVal = /[\w.$]+@\w+[.]+\w+/;
        var error = false;

        var nameTemp = true; 
        var dobTemp = true; 
        var phoneNumberTemp = true; 
        var emailTemp = true; 
        var messageTemp = true; 

        if(!emailVal.test(email)) {
            error = true;
            emailTemp = false;  //working on this area 
        } else {
            emailTemp = true; 
        }

        if(name.length < 1 || !/[\w]+/.test(name)){
            error = true; 
            nameTemp = false; 
        }else {
            nameTemp = true; 
        }
        if(dob.length < 1 || !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(name)){
            error = true; 
            dobTemp = false; 
        }else {
            dobTemp = true; 
        }
        if(phoneNumber.length < 1 || !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(name)){
            error = true; 
            phoneNumberTemp = false; 
        }else {
            phoneNumberTemp = true; 
        }
        if(message.length < 10 || !/[\w]+/.test(message)){
            error = true; 
            messageTemp = false;
        }else {
            messageTemp = true;
        }

        if((nameTemp && emailTemp) && messageTemp){
            error = false; 
        }

        if(error){
            setError(); 
            if(!nameTemp){
                setValidNameState(false)
            } else {
                setValidNameState(true);
            }
            if(!dobTemp){
                setValidDOBState(false)
            } else {
                setValidDOBState(true);
            }
            if(!phoneNumberTemp){
                setValidPhoneNumberState(false);
            } else {
                setValidPhoneNumberState(true);
            }
            if(!emailTemp){
                setValidEmailState(false);
            } else {
                setValidEmailState(true);
            }
            if(!messageTemp){
                setValidMessageState(false);
            } else {
                setValidMessageState(true);
            }
            return;
        }
        setShowError(false)
        setSendStatus('loading')
        setTimeout(() => {
            setSendStatus('after')
        }, 2000);
        disableButton(); 
        /*
        try {
            const response = axios.post(BASE_URL + "/api/contact/", 
              {
                name, 
                email, 
                message
              },
              {withCredentials: true}
            );
        } catch (error) {
            throw error; 
        }
            */
        console.log(name)
        console.log(dob)
        console.log(phoneNumber)
        console.log(email)
        console.log(message)
    }

    const setError = () => {
        setShowError(true);
    }

    const disableButton = () => {
        setButtonDisabled(true);
    }

    const ErrorSign = () => {
        return <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 tablet-sm:h-6 tablet-sm:w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    }
    
    const RenderError = () => {
        return <div className="text-primary-red">
            <ul className="list-none">
                {!validNameState && <li className="flex flex-col-2 text-xs tablet-sm:text-base">
                    {<ErrorSign />}
                    <p><b>Name Requirement Not Met:</b> Please make sure that your name is at least one character length and has at least one letter in it. </p>
                </li>}
                {!validDOBState && <li className="flex flex-col-2 text-xs tablet-sm:text-base">
                    {<ErrorSign />}
                    <p><b>Date of Birth Requirement Not Met:</b> Please make sure that your DoB is in mm/dd/yyyy format</p>
                </li>}
                {!validPhoneNumberState && <li className="flex flex-col-2 text-xs tablet-sm:text-base">
                    {<ErrorSign />}
                    <p><b>Phone Number Requirement Not Met:</b> Please make sure that your phoneNumber is at least 10 number length.</p>
                </li>}
                {!validEmailState && <li className="flex flex-col-2 text-xs tablet-sm:text-base">
                    {<ErrorSign />}
                    <p><b>Email Requirement Not Met:</b> Please make sure that your email is a valid email.</p> 
                </li>}
                {!validMessageState && <li className="flex flex-col-2 text-xs tablet-sm:text-base">
                    {<ErrorSign />}
                    <p><b>Message Requirement Not Met:</b> Please make sure that your message is at least 10 character length and has at least one letter in it.</p>
                </li>}
            </ul>
        </div>
    }

    return(
        <div className = "Contact"> 
            <div className="w-full flex flex-col items-center justify-center bg-custom-yellow text-custom-black font-montserrat py-8 px-6 gap-y-8 tablet:gap-y-16 tablet:px-72 tablet:py-16">
                <div className="text-primary-red font-bold text-[32px] font-lora leading-[41px] tablet:text-5xl tablet:font-black">Membership Form</div>
                {sendStatus === 'before' &&
                <form className="flex flex-col w-full justify-center items-center" onSubmit={handleSubmit}>
                    <div className="w-full text-left px-1">{ showError && <RenderError />}</div>
                    <div className="w-full grid grid-cols-2 justify-center items-center gap-x-4 gap-y-[13px]">
                        <input type ="text" name="name" id="name" placeholder="Name" className="bg-white rounded-lg border-custom-gray border text-[#5B6665] p-4" onChange={(e) => setName(e.target.value)} required value={name}/>
                        <input type ="text" name="dob" id="dob" placeholder="Date of Birth" className="bg-white rounded-lg border-custom-gray border text-[#5B6665] p-4" onChange={(e) => setDOB(e.target.value)} required value={dob}/>
                        <input type ="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" className="bg-white rounded-lg border-custom-gray border text-[#5B6665] p-4" onChange={(e) => setPhoneNumber(e.target.value)} required value={phoneNumber}/>
                        <input type ="text" name="email" id="email" placeholder="Email" className="bg-white rounded-lg border-custom-gray border text-[#5B6665] p-4" onChange={(e) => setEmail(e.target.value)} required value={email}/>
                        <textarea name="message" id="message" placeholder="Why do you want to join?" rows="10" cols="30" className="bg-white rounded-lg border-custom-gray border text-[#5B6665] p-4 col-span-2" onChange={(e) => setMessage(e.target.value)} required value={message}/>
                    </div>
                    
                    <button type="sumbit"className="w-[155px] h-10 bg-primary-yellow text-black font-bold py-2 px-4 mt-8 justify-center items-center text-center disabled:bg-custom-gray" id="sumbitButton" disabled={buttonDisabled}>Sumbit</button>
                    
                </form>}
                {sendStatus === 'loading' && <span className="loading loading-spinner loading-md"></span>}
                {sendStatus === 'after' && 
                <div role="alert" className="alert bg-primary-yellow w-fit p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-montserrat font-semibold ">Message Sent!</span>
                    </div>}
            </div>
            <div className="h-[158px] w-full bg-custom-yellow">
            </div>
        </div>
    )
};
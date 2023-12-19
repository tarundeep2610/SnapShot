import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logowhite from '../assets/Snapshot-white.png';

import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import {client} from '../client';


//there was a error firstly before using gapi-script and that useEffect hook and the code b/w them
// (error) --->  cb=gapi.loaded_0?le=scs:267  Cross-Origin-Opener-Policy policy would block the window.closed call.
// this was the error in console and the response object that i was printing in responseGoogle func was showing
//this was the response obj in console -- popup_closed_by_user	The user closed the popup before finishing the sign in flow.

export default function Login(){
    
    const navigate= useNavigate();

    useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:import.meta.env.VITE_GOOGLE_API_TOKEN,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

    const responseGoogle = (response) => {

        if(response.profileObj){
            localStorage.setItem('user',JSON.stringify(response?.profileObj))
            
            const{ name, googleId, imageUrl } = response.profileObj;
            
            const doc= {
                _id: googleId,
                _type: 'user',
                userName: name,
                image: imageUrl,
            }
    
            client.createIfNotExists(doc)
                .then( () => {
                    navigate('/',{ replace: true })
                })
        }
    }   

    return (
        <div className="flex justify-start-items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video src={shareVideo} type='video/mp4' loop controls={false} muted autoPlay className='w-full h-full object-cover'/>
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logowhite} width='130px' alt='logo'/>
                    </div>

                    <div className="shadow-2xl">
                        <GoogleLogin clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}
                        
                            render={(renderProps) => (
                                <button type='button' className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}>
                                    <FcGoogle className='mr-4'/>
                                    Sign In with Google 
                                </button>
                                )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    </div>    
            </div>
        </div>
    )
}
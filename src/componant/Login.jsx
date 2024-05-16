import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const Login = () => {

    // Refs for input fields
    let name = useRef();
    let password = useRef();

    // State to manage loading status
    const [loading, setLoading] = useState(false);
    let handleSubmit = async () => {
        // Set loading state to true when form is submitted
        setLoading(true);

        // Get input values from refs
        let data = {
            name: name.current.value,
            password: password.current.value,
        };

        // Validate input fields
        if (name.current.value === "" || password.current.value === "") {
            setLoading(false); // Reset loading state
            // Show error alert if any field is empty
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 1000,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "error",
                title: "Please complete all fields",
            });

        } else {
            try {
                name.current.value = "";
                password.current.value = "";
                // Make POST request to user login endpoint
                const res = await axios.post(
                    "http://13.127.211.205:8000/v1/login/admin",
                    data
                );

                console.log(res.status);
                if (res.status == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login Succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.setItem("role", "admin");
                    setTimeout(() => {
                        window.location.href = '/product'
                    }, 1000);
                }
                else {

                }
            } catch (error) {
                console.error(error);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 1000,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "error",
                    title: "Please Valid Details",
                });

            }
        }

    };


    const submitButton = document.querySelector('#btn-submit');
    const submitButtonText = document.querySelector('#btn-submit .button-text');

    submitButton?.addEventListener('click', (e) => {
        e.preventDefault();

        submitButton.classList.add('loading');

        setTimeout(() => {
            submitButton?.classList.remove('loading');
            submitButton?.classList.add('success');
            submitButtonText.innerHTML = 'Login Successful';
        }, 4000);

    });

    return (

            <>





            <div class="main-bg">
            <div class="box-conatiner">
                <div id="a">
                    <div class="circle-ripple"></div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-sm-6">
                        <h1 class="heading-left"> ADMIN PRODUCT </h1>

                    </div>
                    <div class="col-sm-6 col-md-6">
                        <div class="wrap-login100">
                            <span class="login100-form-title">
                               ADMIN LOGIN
                            </span>
                            <form class="login100-form validate-form p-l-55 p-r-55 p-t-20">

                                <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input class="input100" type="text" name="username" placeholder="Username" ref={name} required/>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" data-validate="Please enter password" >
                                    <input class="input100" type="password" name="pass" placeholder="Password" ref={password} required/>
                                    <span class="focus-input100"></span>
                                </div>

                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn" onClick={handleSubmit}>
                                       LOG IN
                                    </button>
                                </div>
                                <div class="flex-col-c p-t-140 p-b-40">


                                    <Link to={'/loginuser'}>  <a href="#" class="txt3">
                                       USER LOGIN
                                    </a></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </>

    )
}

export default Login
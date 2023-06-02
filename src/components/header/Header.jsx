import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Button, { OutlineButton, handleMouseDownPassword } from "../button/Button";

import "./header.scss";
import {
    Box,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Tooltip,
    Typography,
    styled,
    } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MovieSearch } from "../page-header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import GoogleLogin from '../../config/GoogleLogin'
import { getProfile, login, logout, register } from "../../redux/actions/auth";
import { auth, providerfb, providergit } from "../../firebase";
import { signInWithPopup } from "firebase/auth";





const headerNav = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "Movies",
        path: "/movie",
    },
    {
        display: "TV Series",
        path: "/tv",
    },
];

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const [loginbtn, setLoginBtn] = useState(false);
    const [btnregister, setBtnRegister] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const active = headerNav.findIndex((e) => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
        if (
            document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100
        ) {
            headerRef.current.classList.add("shrink");
        } else {
            headerRef.current.classList.remove("shrink");
        }
        };
        window.addEventListener("scroll", shrinkHeader);
        return () => {
        window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitRegis = (e) => {
        e.preventDefault();
    
        const data = { email, password, name };
    
        if (password !== confirmPassword) {
            toast.error("Confirm password must be same with password");
            return;
        }
    
        dispatch(register(data, navigate));
        };

    
    const onSubmit = (e) => {
        e.preventDefault()    
            const data = { email, password }
            dispatch(login(data, navigate))
        }

    const { isLoggedIn, token, user } = useSelector((state) => state.auth)
        useEffect(() => {
            if (isLoggedIn && token) {
                dispatch(getProfile())
            }
        }, [dispatch, isLoggedIn, token])

    const [userGit, setUserGit] = useState(null)
    const [Fb, setUserFb] = useState(null)

    const handleGithubLogin = () => {
        signInWithPopup (auth, providergit)
            .then((result) => {
                setUserGit (result.userGit);
          
            }).catch((error) => {
                console.log(error.message);
            }
            )
        }
    
        const handleFacebookLogin = () => {
            signInWithPopup (auth, providerfb)
                .then((result) => {
                    setUserFb (result.Fb);
                }).catch((error) => {
                    console.log(error.message);
                }
                )
            }

    return (
        <div ref={headerRef} className="header">
        <div className="header__wrap container">
            <div className="logo">
                <Link to="/">Movie List</Link>
            </div>

            <MovieSearch />

            {Fb ? (
                <>
                {Fb && (
                        <div className="account">
                            <p> {Fb.displayName}</p>
                            <img src={Fb.photoURL} width="20" height="20" alt="MyAwesomeImage"/>
                            <button onClick={() => dispatch(logout(navigate))}> Log Out</button>
                        </div>
                    )}
                </>
            ) : (
                false
            )}

            {userGit ? (
                <>
                {userGit && (
                        <div className="account">
                            <p> {userGit.displayName}</p>
                            <img src={userGit.photoURL} width="20" height="20" alt="MyAwesomeImage"/>
                            <button onClick={() => dispatch(logout(navigate))}> Log Out</button>
                        </div>
                    )}
                </>
            ) : (
                false
            )}

            {isLoggedIn ? (
            
            <ul className="header__nav">
                {headerNav.map((e, i) => (
                <li key={i} className={`${i === active ? "active" : ""}`}>
                    <Link to={e.path}>{e.display}</Link>
                </li>
                ))}
                <div>
                    {user && (
                        <div className="account">
                            <p> {user?.name}</p>
                            <img src={user?.photoURL} width="20" height="20" alt="MyAwesomeImage"/>
                            <button onClick={() => dispatch(logout(navigate))}> Log Out</button>
                        </div>
                    )}
                </div>
            </ul>
            
            ) : ( 

            <ul className="header__nav" >
                <Button className="small" onClick={(e) => setLoginBtn(true)}>
                Login
                </Button>
                
                <StyledModal open={loginbtn} onClose={(e) => setLoginBtn(false)}>
                    <Box width={700} height="auto" bgcolor="white" p={3} borderRadius={5}>
                    
                        <Typography variant="h5" fontWeight="600" color="gray" marginBottom={3}>
                            Login In Your Account
                        </Typography>

                        <React.Fragment>
                            <form autoComplete="off" onSubmit={onSubmit}>
                                <FormControl color="warning" type="email" fullWidth sx={{ mb: 3 }}>
                                    <InputLabel> Email Address </InputLabel>
                                    <OutlinedInput value={email} onChange={(e) => setEmail(e.target.value)}
                                        label="Email Address"
                                        endAdornment= {
                                            <InputAdornment position="end">
                                                <EmailIcon />
                                            </InputAdornment>}
                                    />
                                </FormControl>

                                <FormControl sx={{ marginBottom: 3 }} variant="outlined" fullWidth color="warning">
                                    <InputLabel> Password </InputLabel>
                                    <OutlinedInput value={password} onChange={(e) => setPassword(e.target.value)}
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        } />
                                </FormControl>

                                <Button className="loginBtn" variant="outlined" type="submit">
                                Login
                                </Button>
                            </form>
                        </React.Fragment>

                        <Divider sx={{ paddingTop: "30px" }}>
                            <Typography variant="subtitle1" color="black">
                                {" "}
                                Or Sign Up Using{" "}
                            </Typography>{" "}
                        </Divider>

                        <div className="logo-login">              
                            <Tooltip placement="right-start" >
                                <GoogleLogin/>                          
                            </Tooltip>

                            <Tooltip placement="right-start" onClick={handleGithubLogin}>
                                <IconButton>
                                    <Link to="/">
                                        <GitHubIcon fontSize="large" style={{ color: "black" }} />
                                    </Link>
                                </IconButton>
                            </Tooltip>

                            <Tooltip placement="right-start" onClick={handleFacebookLogin}>
                                <IconButton>
                                    <Link to="/">
                                        <FacebookIcon fontSize="large" color="primary" />
                                    </Link>
                                </IconButton>
                            </Tooltip>
                        </div>
                </Box>
            </StyledModal>

 {/* ----------------------------------------REGISTER--------------------------------------------------  */}
            
            <OutlineButton className="loginBtn" onClick={(e) => setBtnRegister(true)}> Register </OutlineButton>
            
            <StyledModal open={btnregister} onClose={(e) => setBtnRegister(false)}>
                <Box width={700} height="auto" bgcolor="white" p={3} borderRadius={5}>
                    
                    <Typography variant="h5" fontWeight="600" color="gray" paddingBottom={5}>
                    Create Account
                    </Typography>

                    <React.Fragment>
                        <form autoComplete="off" onSubmit={onSubmitRegis}>

                            <FormControl variant="outlined" color="warning" type="text" fullWidth sx={{ mb: 3 }}
                            value={name} onChange={(e) => setName(e.target.value)}>
                                <InputLabel> Username </InputLabel>
                                <OutlinedInput 
                                    label="Username"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <PersonIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            
                            <FormControl variant="outlined" color="warning" type="email" fullWidth sx={{ mb: 3 }} 
                            value={email} onChange={(e) => setEmail(e.target.value)} >
                                <InputLabel> Email Address </InputLabel>
                                <OutlinedInput 
                                label="Email Address"
                                    endAdornment= {
                                        <InputAdornment position="end"><EmailIcon /></InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl sx={{ marginBottom: 3 }} variant="outlined" fullWidth color="warning" type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} >
                                <InputLabel > Password </InputLabel>
                                <OutlinedInput 
                                label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>

                        <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth type="password" color="warning">
                            <InputLabel color="warning">
                                Confirm Password
                            </InputLabel> 
                            
                            <OutlinedInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Confirm Password"/>
                        </FormControl> 

                        <Button className="loginBtn" variant="outlined" color="secondary" type="submit">
                        Register Now
                        </Button>
                        
                    </form>
                    </React.Fragment>
                </Box>
                </StyledModal>
            </ul>
            )}
        </div>
        </div>
    );
};

export default Header;

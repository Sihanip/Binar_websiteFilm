import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import { category } from "../../api/tmdbApi";

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
    TextField,
    Tooltip,
    Typography,
    styled,
    } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app, { signInWithFacebook, signInWithGithub, signInWithGoogle } from "../../firebase";
import { aouth } from "../../firebase";

import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from "react-hook-form";


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

export const MovieSearch = (props) => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
        navigate(`/${category.movie}/search/${keyword}`);
        }
        if (keyword.trim().length > 0) {
        navigate(`/${category.tv}/search/${keyword}`);
        }
    }, [keyword, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            goToSearch();
        }
        };

        document.addEventListener("keyup", enterEvent);
        return () => {
        document.removeEventListener("keyup", enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
        <Input type="text" placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            <Button className="small" onClick={goToSearch}>
            Search
            </Button>
        </div>
    );
};

const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
    return (
        <TextField {...props} InputProps={{...InputProps, 
        startAdornment: iconStart ? (
            <InputAdornment position="start">{iconStart}</InputAdornment>
            ) : null,
        endAdornment: iconEnd ? (
            <InputAdornment position="end">{iconEnd}</InputAdornment>
            ) : null,
        }}
        />
    );
};


const Header = () => {
    
  // Ubah Routing di sini
    const location = useLocation();
    const isHomeRoute = location.pathname === "/" 
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const [login, setLogin] = useState(false);
    const [btnregister, setBtnRegister] = useState(false);

    const [eye, setEye] = useState(false)
    const handleEye = () => {
        setEye(!eye)
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    
    
    const signUserOut = async () => {
        await signOut(auth);
    };
    
    const auth = getAuth(app);

    const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("sukses")
        // ...
    })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            alert(errorCode)
            // ..
    });
}

const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("sukses")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode)
      });
}

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

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

    const [user] = useAuthState(aouth)

    return (
        <div ref={headerRef} className="header">
        <div className="header__wrap container">
            <div className="logo">
            <Link to="/">Movie List</Link>
            </div>

            <MovieSearch />

            {!isHomeRoute && (
            <ul className="header__nav">
                {headerNav.map((e, i) => (
                <li key={i} className={`${i === active ? "active" : ""}`}>
                    <Link to={e.path}>{e.display}</Link>
                </li>
                ))}
                <div>
            {user && (
                <div className="account">
                  
                    <p> {user?.displayName} </p>
                    <img src={user?.photoURL} width="20" height="20" alt="MyAwesomeImage"/>
                    <button onClick={signUserOut}> Log Out</button>
                </div>
            )}
            </div>
            </ul>
            
            )}

            {isHomeRoute && (
            
            <ul className="header__nav" >
                <Button className="small" onClick={(e) => setLogin(true)}>
                Login
                </Button>
            <StyledModal open={login} onClose={(e) => setLogin(false)}>
                <Box width={700} height="auto" bgcolor="white" p={3} borderRadius={5}>
                    
                    <Typography variant="h5" fontWeight="600" color="gray" marginBottom={3}>
                        Login In Your Account
                    </Typography>

                    <React.Fragment>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                        <IconTextField onChange={(e) => setEmail (e.target.value)} label="Email Address" color="warning" type="email" fullWidth sx={{ mb: 3 }} iconEnd={<EmailIcon />}
                        {...register("email", { required: "E-mail Address is required." })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message} />

                    <FormControl sx={{ marginBottom: 3 }} variant="outlined" fullWidth 
                    {...register("password", { required: "Password is required." })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    >
                    <InputLabel htmlFor="outlined-adornment-password" color="warning" >
                        Password
                        </InputLabel>
                        <OutlinedInput id="outlined-adornment-password" label="Password" variant="outlined" color="warning" type={eye? "text" : "password"} fullWidth sx={{ mb: 3 }}
                            endAdornment= {
                            <InputAdornment position="end">
                                <IconButton onClick={handleEye} edge="end">
                                {eye ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                            } 
                            />
                        </FormControl>

                        <Button onClick={signIn} className="loginBtn" variant="outlined" type="submit">
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
                        
                        <Tooltip placement="right-start" onClick={signInWithGoogle}>
                            <IconButton>
                                <Link to="/home">
                                <GoogleIcon fontSize="large" color="error" />
                                </Link>
                            </IconButton>
                            
                        </Tooltip>

                        <Tooltip placement="right-start" onClick={signInWithGithub}>
                            <IconButton>
                            <Link to="/">
                                <GitHubIcon fontSize="large" style={{ color: "black" }} />
                                </Link>
                            </IconButton>
                        </Tooltip>

                        <Tooltip placement="right-start" onClick={signInWithFacebook}>
                            <IconButton>
                            <Link to="/">
                                <FacebookIcon fontSize="large" color="primary" />
                                </Link>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
            </StyledModal>

{/* REGOSTER-------------------------------------------------- */}
                <OutlineButton className="loginBtn" onClick={(e) => setBtnRegister(true)}>
                Register
                </OutlineButton>

                <StyledModal open={btnregister} onClose={(e) => setBtnRegister(false)}>
                <Box width={700} height="auto" bgcolor="white" p={3} borderRadius={5}>
                    <Typography variant="h5" fontWeight="600" color="gray" paddingBottom={5}>
                    Create Account
                    </Typography>

                    <React.Fragment>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <IconTextField label="First Name" color="warning" type="text" 
                        fullWidth sx={{ mb: 3 }} iconEnd={<PersonIcon/>}
                        {...register("firstName", { required: "First Name is required." })}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName?.message}
                    />

                    <IconTextField label="Last Name" color="warning" type="text" fullWidth sx={{ mb: 3 }} iconEnd={<PersonIcon />}
                    {...register("lastName", { required: "Last Name is required." })}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}/>

                    <IconTextField onChange={(e) => setEmail (e.target.value)} label="Email Address" color="warning" type="email" fullWidth sx={{ mb: 3 }} iconEnd={<EmailIcon />}
                    {...register("email", { required: "Email is required." })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    />

                        <FormControl variant="outlined" fullWidth 
                        {...register("password", { required: "Password is required." })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}>
                        <InputLabel htmlFor="outlined-adornment-password" color="warning">
                            Password
                        </InputLabel>
                        <OutlinedInput id="outlined-adornment-password" label="Password" variant="outlined" color="warning" type={eye? "text" : "password"} fullWidth sx={{ mb: 3 }}
                            endAdornment= {
                            <InputAdornment position="end">
                                <IconButton onClick={handleEye} edge="end">
                                {eye ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                            }
                            onChange={(e) => setPassword (e.target.value)} 
                            {...register("passwordName", { required: "Password is required." })}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}/>
                    </FormControl>

                        <FormControl variant="outlined" fullWidth 
                        {...register("confirmPassword", { required: "Confirm Password is required." })}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword?.message}>
                        <InputLabel htmlFor="outlined-adornment-password" color="warning">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput id="outlined-adornment-password" label="Confirm Password" variant="outlined" color="warning" type={eye? "text" : "password"} fullWidth sx={{ mb: 3 }}
                            endAdornment= {
                            <InputAdornment position="end">
                                <IconButton onClick={handleEye} edge="end">
                                {eye ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                            }
                        
                            onChange={(e) => setPassword (e.target.value)}/>
                    </FormControl>

                        <Button onClick={signUp} className="loginBtn" variant="outlined" color="secondary" type="submit" >
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

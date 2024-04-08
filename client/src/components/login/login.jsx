import React from "react"
import {useNavigate} from "react-router-dom"
import './login.css'

export const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/home")
    }
    return (
        <div>
            <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center pb-1"style={{textAlign:"center", display:"flex", flexDirection:"column", alignItems:'center'}}>
                                                <div className="logo"></div>
                                                <br />
                                                <br />
                                                <br />
                                               
                                            </div>
                                            <form>
                                                <p>Please login to your account</p>
                                                <div className="form-outline mb-4">
                                                    <input type="email" id="form2Example11" className="form-control"
                                                        placeholder="Phone number or email address" />
                                                    <label className="form-label" htmlFor="form2Example11">Username</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form2Example22" className="form-control" />
                                                    <label className="form-label" htmlFor="form2Example22">Password</label>
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn btn-success btn-block  mb-3" type="submit" onClick={handleSubmit}>Log in</button>
                                                    <br />
                                                    <a className="text-muted" href="#!">Forgot password?</a>
                                                </div>                                             
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        {/* <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">We are more than just a company</h4>
                                            <p className="small mb-0">CTmotors Madagascar est fier de proposer des véhicules de haute qualité, alliant performance et fiabilité, pour répondre aux besoins de nos clients. Notre engagement envers l’excellence et notre passion pour l’innovation font de nous un leader sur le marché automobile malagasy</p>
                                        </div> */}
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            {/* <h4 className="mb-4">We are more than just a company</h4>
                                            <p className="small mb-0">CTmotors Madagascar est fier de proposer des véhicules de haute qualité, alliant performance et fiabilité, pour répondre aux besoins de nos clients. Notre engagement envers l’excellence et notre passion pour l’innovation font de nous un leader sur le marché automobile malagasy</p> */}
                                            <img
                                                className="col-lg-10 d-center"
                                                src="https://annuaire.mg/wp-content/uploads/2016/05/ctmotors-logo.png"
                                                alt="logo"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

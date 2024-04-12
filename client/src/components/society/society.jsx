import { Row, Col,Card,Button } from "react-bootstrap"
import Swal from "sweetalert2";
import axios from 'axios';
import { useState ,useEffect} from "react";
import './society.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";


export const Society = ({ t }) => {

    const [company_name, setCompany_name] = useState("")
    const [address, setAddress] = useState("")
    const [company_email, setCompany_email] = useState("")
    const [nif, setNif] = useState("")
    const [stat, setStat] = useState("")
    const [logo, setLogo] = useState()
    const [validationError,setValidationError] = useState({})
    const [societies, setSocieties] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    // const { t } = useTranslation();

    const changeHandler = (event) => {
          setLogo(event.target.files[0]);
      };
  
    const createSociety = async (e) => {
      e.preventDefault();
  
      const formData = new FormData()
  
      formData.append('company_name', company_name)
      formData.append('address', address)
      formData.append('company_email', company_email)
      formData.append('nif', nif)
      formData.append('stat', stat)
      formData.append('logo', logo)
  
      await axios.post(`http://localhost:8000/api/societies`, formData).then(({data})=>{
        // Swal.fire({
        //   icon:"success",
        //   text:data.message
        // })
        toast.success('Society created successfully');
      }).catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.errors)
        }else{
          Swal.fire({
            text:response.data.message,
            icon:"error"
          })
        }
      })
    }

    useEffect(() => {
        fetchSocieties();
    }, []);

    const fetchSocieties = async () => {
        await axios.get(`http://localhost:8000/api/societies`).then(({ data }) => {
            setSocieties(data);
        });
    };

    const deleteSocieties = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/societies/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchSocieties();
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            });
        });
    };
    const editSociety = (society) => {
        setCompany_name(society.company_name);
        setAddress(society.address);
        setCompany_email(society.company_email);
        setNif(society.nif);
        setStat(society.stat);
        setLogo(society.logo);
        setIsEditing(society.id);
      };

      const updateSociety = async (e) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('company_name', company_name)
        formData.append('address', address)
        formData.append('company_email', company_email)
        formData.append('nif', nif)
        formData.append('stat', stat)
        if(logo!==null){
          formData.append('logo', logo)
        }
    
        await axios.post(`http://localhost:8000/api/societies/${isEditing}`, formData).then(({data})=>{
          // Swal.fire({
          //   icon:"success",
          //   text:data.message,
            
          // })
          toast.info('Society updated successfully');
          fetchSocieties()
          setCompany_name('');
          setAddress('');
          setCompany_email('');
          setNif('');
          setStat('');
          setLogo('');
          setIsEditing('');
          setLogo('')
        }).catch(({response})=>{
          if(response.status===422){
            setValidationError(response.data.errors)
          }else{
            Swal.fire({
              text:response.data.message,
              icon:"error"
            })
          }
        })
    }
    
      
      const handleCancel = () => {
        setIsEditing(null);
        setCompany_name("");
        setAddress("");
        setCompany_email("");
        setNif("");
        setStat("");
        setLogo(null);
      };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
          updateSociety(e);
        } else {
          createSociety(e);
        }
      };
      

    return (
        <Row>
            <Col md={3}>
                <form onSubmit={createSociety}>
                    {isEditing ? (
                      <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Modify society')}</Card.Header>
                    ):(
                      <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Add society')}</Card.Header>
                    )}
                    <div className="mb-3">
                        <label htmlFor="company_name" className="form-label">{t('Company Name')}</label>
                        <input type="text" className="form-control" placeholder={t('Enter company name')} id="company_name" value={company_name} onChange={(e) => setCompany_name(e.target.value)} />
                        {validationError.company_name && <div className="text-danger">{validationError.company_name[0]}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">{t('Address')}</label>
                        <input type="text" placeholder={t('Enter address')} className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        {validationError.address && <div className="text-danger">{validationError.address[0]}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="company_email" className="form-label">{t('Company Email')}</label>
                        <input type="email" placeholder={t('Enter company email')} className="form-control" id="company_email" value={company_email} onChange={(e) => setCompany_email(e.target.value)} />
                        {validationError.company_email && <div className="text-danger">{validationError.company_email[0]}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nif" className="form-label">NIF</label>
                        <input type="text" placeholder={t('Enter nif')}  className="form-control" id="nif" value={nif} onChange={(e) => setNif(e.target.value)} />
                        {validationError.nif && <div className="text-danger">{validationError.nif[0]}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stat" className="form-label">Stat</label>
                        <input type="text" placeholder={t('Enter stat')} className="form-control" id="stat" value={stat} onChange={(e) => setStat(e.target.value)} />
                        {validationError.stat && <div className="text-danger">{validationError.stat[0]}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="logo" className="form-label">Logo</label>
                        <input type="file" placeholder="Logo" className="form-control" id="logo" onChange={changeHandler} />
                        {validationError.logo && <div className="text-danger">{validationError.logo[0]}</div>}
                    </div>
                    <Button onClick={handleSubmit}>
                      {isEditing ? t("Modify society") : t("Add society")}
                    </Button>
                </form>
            </Col>
            <Col md={9} style={{borderLeft:'1px solid grey'}}>
                <div className="col-md-11" style={{border:'none', marginRight:'-150px'}}>
                    <Card style={{backgroundColor:'transparent',border:'none', marginRight:'-100px',maxHeight:'750px',overflowY:'auto'}}>
                    <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Society List')}</Card.Header>
                        <Card.Body  style={{backgroundColor:'transparent',width:'100%'}}>
                            <div style={{width:'100%'}} className="society-table">
                                <table style={{width:"100%" ,background:'transparent', textAlign:'center'}}>
                                    <thead>
                                        <tr>
                                            <th>{t('Company Name')}</th>
                                            <th>{t("Address")}</th>
                                            <th>{t('Company Email')}</th>
                                            <th>Nif</th>
                                            <th>Stat</th>
                                            <th>Logo</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {societies.length === 0 ? (
                         <tr>
                      <td colSpan="6" className="text-center">
                      <div className="dot-spinner">
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                      </div>
                      </td>
                  </tr>
                      ) : (
                                            societies.length > 0 && (
                                                societies.map((row, key) => (
                                                    <tr key={key}>
                                                        <td>{row.company_name}</td>
                                                        <td>{row.address}</td>
                                                        <td>{row.company_email}</td>
                                                        <td>{row.nif}</td>
                                                        <td className="col-md-1">{row.stat}</td>
                                                        <td className="col-md-1">
                                                            <img width="50px" src={`http://localhost:8000/storage/society/logo/${row.logo}`} alt="Society Logo" />
                                                        </td>
                                                        <td>
                                                            <Button variant="primary" onClick={() => editSociety(row)}><FontAwesomeIcon icon={faEdit}/></Button>
                                                            <span>&nbsp;</span>
                                                            <Button variant="danger" onClick={() => deleteSocieties(row.id)}>
                                                                <FontAwesomeIcon icon={faTrash}/>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
            <ToastContainer />
        </Row>
    )    
}

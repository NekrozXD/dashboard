import { Row, Col,Card,Button } from "react-bootstrap"
  import Swal from "sweetalert2";
  import axios from 'axios';
  import { useState ,useEffect} from "react";
  import './material.css'
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useTranslation } from "react-i18next";

export const Material = ({ t }) => {
        const [name, setName] = useState("")
        const [serial_number, setSerialnumber] = useState("")
        const [ip_url, setIpurl] = useState("")
        const [login, setLogin] = useState("")
        const [password, setPassword] = useState("")
        const [validationError,setValidationError] = useState({})
        const [materials, setMaterials] = useState([]);
        const [isEditing, setIsEditing] = useState(null);

    
      const createMaterial = async (e) => {
        e.preventDefault();
    
        const formData = new FormData()
    
        formData.append('name', name)
        formData.append('serial_number', serial_number)
        formData.append('ip_url', ip_url)
        formData.append('login', login)
        formData.append('password', password)
        await axios.post(`http://localhost:8000/api/materials`, formData).then(({data})=>{
          // Swal.fire({
          //   icon:"success",
          //   text:data.message
          // })
          toast.success('Material created succesfully');
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
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        await axios.get(`http://localhost:8000/api/materials`).then(({ data }) => {
            setMaterials(data);
        });
    };
    const deleteMaterials = async (id) => {
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

        await axios.delete(`http://localhost:8000/api/materials/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchMaterials();
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            });
        });
    };

    const editMaterial = (material) => {
        setName(material.name);
        setSerialnumber(material.serial_number);
        setIpurl(material.ip_url);
        setLogin(material.login);
        setPassword(material.password);
        setIsEditing(material.id);
      };
    
        const updateMaterial = async (e) => {
            e.preventDefault();
            const formData = new FormData()
          formData.append('_method', 'PATCH');
          formData.append('name', name)
          formData.append('serial_number', serial_number)
          formData.append('ip_url', ip_url)
          formData.append('login', login)
          formData.append('password', password)
        
      
          await axios.post(`http://localhost:8000/api/materials/${isEditing}`, formData).then(({data})=>{
            // Swal.fire({
            //   icon:"success",
            //   text:data.message,
              
            // })
            toast.success('Material updated succesfully');
            fetchMaterials()
            setName('');
            setSerialnumber('');
            setIpurl('');
            setLogin('');
            setPassword('');
            setIsEditing('')
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
        setName("");
        setSerialnumber("");
        setIpurl("");
        setLogin("");
        setPassword("");
      };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
          updateMaterial(e);
        } else {
          createMaterial(e);
        }
      };
  return (
    <Row>
              <Col md={3}>
                  <form onSubmit={createMaterial}>
                      <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Add material')}</Card.Header>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">{t('Name')}</label>
                          <input type="text" placeholder={t('Name')} className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                          {validationError.name && <div className="text-danger">{validationError.name[0]}</div>}
                      </div>
                      <div className="mb-3">
                          <label htmlFor="serial_number" className="form-label">{t('Serial number')}</label>
                          <input type="text" placeholder={t('Serial number')} className="form-control" id="serial_number" value={serial_number} onChange={(e) => setSerialnumber(e.target.value)} />
                          {validationError.serial_number && <div className="text-danger">{validationError.serial_number[0]}</div>}
                      </div>
                      <div className="mb-3">
                          <label htmlFor="ip_url" className="form-label">IP / Url</label>
                          <input type="text" placeholder="IP/ Url" className="form-control" id="ip_url" value={ip_url} onChange={(e) => setIpurl(e.target.value)} />
                          {validationError.ip_url && <div className="text-danger">{validationError.ip_url[0]}</div>}
                      </div>
                      <div className="mb-3">
                          <label htmlFor="login" className="form-label">{t('Login')}</label>
                          <input type="text" placeholder={t('Login')} className="form-control" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                          {validationError.login && <div className="text-danger">{validationError.login[0]}</div>}
                      </div>
                      <div className="mb-3">
                          <label htmlFor="password" className="form-label">{t('Password')}</label>
                          <input type="text" placeholder={t('Password')} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          {validationError.password && <div className="text-danger">{validationError.password[0]}</div>}
                      </div>
                      <Button onClick={handleSubmit}>
                        {isEditing ? t("Update material") : t("Add material")}
                      </Button>
                  </form>
              </Col>
              <Col md={9} style={{borderLeft:'1px solid grey'}}>
                  <div className="col-md-11" style={{border:'none', marginRight:'-150px'}}>
                      <Card style={{backgroundColor:'transparent',border:'none', marginRight:'-100px',maxHeight:'750px',overflowY:'auto'}}>
                      <Card.Header style={{backgroundColor:'#50b64a', padding:'10px' ,textAlign:'center',color:"white",fontWeight:'bolder'}}>{t('Material list')}</Card.Header>
                          <Card.Body  style={{backgroundColor:'transparent',width:'100%'}}>
                              <div style={{width:'100%'}} className="society-table">
                                  <table style={{width:"100%" ,background:'transparent', textAlign:'center'}}>
                                      <thead>
                                          <tr>
                                              <th>{t('Name')}</th>
                                              <th>{t('Serial number')}</th>
                                              <th>IP / Url</th>
                                              <th>{t('Login')}</th>
                                              <th>{t('Password')}</th>
                                              <th>Actions</th>
                                          </tr>
                                      </thead>
                                      <tbody >
                                          
                                            {materials.length === 0 ? (
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
                                              materials.length > 0 && (
                                                  materials.map((row, key) => (
                                                      <tr key={key}>
                                                          <td>{row.name}</td>
                                                          <td>{row.serial_number}</td>
                                                          <td>{row.ip_url}</td>
                                                          <td>{row.login}</td>
                                                          <td>{row.password}</td>
                                                          <td>
                                                              <Button variant="primary" onClick={() => editMaterial(row)}><FontAwesomeIcon icon={faEdit}/></Button>
                                                              <span>&nbsp;</span>
                                                              <Button variant="danger" onClick={() => deleteMaterials(row.id)}>
                                                                  <FontAwesomeIcon icon={faTrash}/>
                                                              </Button>
                                                          </td>
                                                      </tr>
                                                  ))
                                            )  )}
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


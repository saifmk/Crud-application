import React, { useEffect, useState } from 'react';
import { Button, Modal,ModalTitle,ModalHeader,ModalFooter,ModalBody} from 'react-bootstrap'
import axios from 'axios'

const Users = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState('')
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) } 

    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }

    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }

    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mail, setMail] = useState("")

    const [Delete,setDelete] = useState(false)

    const [id,setId] = useState("");
    const GetUsersData = () => {

        const url = 'https://reqres.in/api/users'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'https://reqres.in/api/users'
        const Credentials = {mail,firstName,lastName }
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                console.log(result);
                const { status, message,data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                    console.log(data);
                }
                else {
                    setData(data)
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleEdit = () =>{
        const url = `https://reqres.in/api/users/${id}`
        const Credentials = { mail,firstName,lastName }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDelete = () =>{
        const url = `https://reqres.in/api/users/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        GetUsersData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Add New User-Detail
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Avatar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <ModalHeader closeButton>
                        <ModalTitle>View User Data</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.firstName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.lastName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="mail" className='form-control' value={RowData.mail} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete User</Button>
                                )
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <ModalHeader closeButton>
                        <ModalTitle>Add new User</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setFirstName(e.target.value)} placeholder="Please enter First Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setLastName(e.target.value)} placeholder="Please enter Last Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setMail(e.target.value)} placeholder="Please enter Mail" />
                            </div>
                           
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add User</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <ModalHeader closeButton>
                        <ModalTitle>Edit User</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <div className='form-group'>
                                <label>First Name</label>
                                <input type="text" className='form-control' onChange={(e) => setFirstName(e.target.value)} placeholder="Please enter First Name" defaultValue={RowData.firstName}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Last Name</label>
                                <input type="text" className='form-control' onChange={(e) => setLastName(e.target.value)} placeholder="Please enter Last Name" defaultValue={RowData.lastName} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="mail" className='form-control' onChange={(e) => setMail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.mail}/>
                            </div>

                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit User</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
};

export default Users;
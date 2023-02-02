/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import uuid from 'react-uuid';

import { updateProfile } from 'firebase/auth';
import PlusIcon from '@/icons/plusIcon.svg';
import MinusIcon from '@/icons/minusIcon.svg';

import { useAuth } from '@/contexts/AuthContext';

const AddUsers = () => {

  // TODO: Make it so a tick appears next to the user that was successfully registered and disable the input fields and button based on this
  // If it fails add a red cross saying this user already exists
  const [users, setUsers] = useState([{ id: uuid(), name: '', email: '', registered: false, regError: false, }]);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [successMesssage, setSuccessMessage] = useState('')

  const { signup } = useAuth();

  const onChangeUser = (key: string, userId: string, event) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          [key]: event.target.value,
        };
      }

      return user;
    });

    setUsers(updatedUsers);
  };

  const onClickAddNewUser = () => {
    setValidationError('')
    setSuccessMessage('')

    const updatedUsers = [
      ...users,
      {
        id: uuid(),
        name: '',
        email: '',
        registered: false,
        regError: false,
      },
    ];

    setUsers(updatedUsers);
  };

  const onClickRemoveUser = (userId: string) => {
    const updatedUsers = users.filter((user) => userId !== user.id);

    setUsers(updatedUsers);
  };

  const onHandleRegisterUsers = async (event, email: string, name: string, userId: string) => {
    event.preventDefault();

    try {
      setValidationError('')
      setIsLoading(true);

      const newUser = await signup(email, uuid());

      await updateProfile(newUser.user, { displayName: name });

      setSuccessMessage('Successfully registered user!')

      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            registered: true
          }
     
        }

        return user
      })

      setUsers(updatedUsers)

    } catch (error) {
      setSuccessMessage('')
      console.log(error);
      setValidationError('Error! Email already in use.');
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <div className="d-flex justify-content-md-between mb-4 align-items-center">
          <h2 className="mb-0">Add a New User</h2>
          <Button variant="link"><Link href="/home">Back Home</Link></Button>
        </div>
        <Form>
          {users.map((user, index) => {
            return (
              <div className="d-flex align-items-center" key={user.id}>
                <div className="d-flex">
                  <Form.Group id="name" className="mb-2 me-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={user.registered}
                      required
                      value={user.name}
                      onChange={(e) => onChangeUser('name', user.id, e)} />
                  </Form.Group>
                  <Form.Group id="name" className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="email-input"
                      disabled={user.registered}
                      required
                      value={user.email}
                      onChange={(e) => onChangeUser('email', user.id, e)} />
                  </Form.Group>
                </div>
                <div className='d-flex flex-row align-items-center mt-4' style={{height: '60px'}}>
                  <Button
                    type="submit"
                    className="btn-secondary w-30 ms-4"
                    size="sm"
                    disabled={isLoading || user.registered}
                    onClick={(e) => onHandleRegisterUsers(e, user.email, user.name, user.id)}>
                    Submit
                  </Button>
                {validationError
                  ? <p className="text-danger mb-0 ms-3">{validationError}</p>
                  : null
                }
                {successMesssage
                  ? <p className="text-success">{successMesssage}</p>
                  : null
                }
                
                  {index !== 0
                    ? (
                      <div className="ms-3 p-2 icon" onClick={() => onClickRemoveUser(user.id)}>
                        <MinusIcon />
                      </div>
                    )
                    : null
                      }
                </div>
              </div>
            );
          })}
          <div className="mb-4 d-flex align-items-center">
            <p className="m-0">Add another user</p>
            <div className="d-flex align-items-center ms-1 p-2 icon" onClick={onClickAddNewUser}>
              <PlusIcon />
            </div>
          </div>
          <Button type="button" onClick={() => setUsers([{ id: uuid(), name: '', email: '', registered: false, regError: false }])}>Clear</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUsers;


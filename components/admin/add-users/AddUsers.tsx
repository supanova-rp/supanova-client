/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import uuid from 'react-uuid';
import { updateProfile } from 'firebase/auth';

import TickIcon from '@/icons/tickIcon.svg';

import { InputChangeEvent, FormSubmitEvent } from '@/index';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colorPalette';
import { updateUsers } from '@/utils/utils';

import XIcon from '../../XIcon';
import FormGroup from '../FormGroup';
import Navbar from '../nav-and-sidebars/Navbar';
import RemoveInput from '../RemoveInput';
import AddMoreInputs from '../AddMoreInputs';

const AddUsers = () => {
  const usersDefaultState = [{
    id: uuid(),
    name: '',
    email: '',
    registered: false,
    regError: false,
    hasPasswordResetError: false,
  }];

  const [users, setUsers] = useState(usersDefaultState);
  const [isLoading, setIsLoading] = useState(false);

  const { signup, resetPassword } = useAuth();

  const onChangeUser = (key: string, userId: string, event: InputChangeEvent) => {
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
    const updatedUsers = [
      ...users,
      {
        id: uuid(),
        name: '',
        email: '',
        registered: false,
        regError: false,
        hasPasswordResetError: false,
      },
    ];

    setUsers(updatedUsers);
  };

  const onClickRemoveUser = (userId: string) => {
    const updatedUsers = users.filter((user) => userId !== user.id);

    setUsers(updatedUsers);
  };

  const onHandleRegisterUser = async (event: FormSubmitEvent, email: string, name: string, userId: string) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const newUser = await signup(email, uuid());

      await updateProfile(newUser.user, { displayName: name });

      const usersAfterReg = updateUsers(users, userId, { registered: true, regError: false });

      try {
        await resetPassword(email);

        const usersAfterPasswordReset = updateUsers(usersAfterReg, userId, { hasPasswordResetError: false });

        setUsers(usersAfterPasswordReset);
      } catch (error) {
        console.log('>>> Error sending reset password email: ', error);

        const usersAfterFailedPasswordReset = updateUsers(users, userId, { hasPasswordResetError: true });

        setUsers(usersAfterFailedPasswordReset);
      }
    } catch (error) {
      console.log('>>> Error registering user: ', error);

      const usersAfterFailedReg = updateUsers(users, userId, { regError: true });

      setUsers(usersAfterFailedReg);
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-100 p-3 d-flex mh-100 rounded-0">
      <Card.Body>
        <Navbar title="Add New Users" />
        {users.map((user) => {
          return (
            <Form onSubmit={(e) => onHandleRegisterUser(e, user.email, user.name, user.id)} key={user.id}>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <FormGroup
                    formId="name"
                    label="Name"
                    type="text"
                    className="mb-2 me-4"
                    disabled={user.registered}
                    value={user.name}
                    onChange={(e) => onChangeUser('name', user.id, e)} />
                  <FormGroup
                    formId="email"
                    label="Email"
                    className="mb-2"
                    type="email"
                    disabled={user.registered}
                    value={user.email}
                    onChange={(e) => onChangeUser('email', user.id, e)} />
                </div>

                <div className="d-flex flex-row align-items-center mt-4">
                  <Button
                    type="submit"
                    className="btn-secondary w-30 ms-4"
                    size="sm"
                    disabled={isLoading || user.registered}>
                    Submit
                  </Button>

                  {user.regError
                    ? <XIcon text="Error adding user" />
                    : null
                  }

                  {user.hasPasswordResetError
                    ? <XIcon text="Error sending password reset email to user" />
                    : null
                  }

                  {user.registered && !user.hasPasswordResetError
                    ? <TickIcon stroke={colors.green} className="ms-3" />
                    : null
                  }

                  {users?.length > 1 && !user.registered
                    ? <RemoveInput onClickFunction={() => onClickRemoveUser(user.id)} margin="ms-2 mt-3" />
                    : null
                  }
                </div>
              </div>
            </Form>
          );
        })}

        <AddMoreInputs title="Add another user" onClick={onClickAddNewUser} marginTop="mt-3" />
        <Button type="button" onClick={() => setUsers(usersDefaultState)}>Clear all users</Button>
      </Card.Body>
    </Card>
  );
};

export default AddUsers;

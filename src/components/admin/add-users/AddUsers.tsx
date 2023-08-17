import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import uuid from "react-uuid";

import { ReactComponent as TickIcon } from "../../../icons/tickIcon.svg";

import { InputChangeEvent, FormSubmitEvent } from "../../../types/index";
import useRequest from "src/hooks/useRequest";
import { colors } from "../../../constants/colorPalette";
import { getEmailJsParams, updateUsers } from "../../../utils/utils";

import XIcon from "../../XIcon";
import FormInput from "../../FormInput";
import AdminHeader from "../AdminHeader";
import RemoveInput from "../../RemoveInput";
import AddMoreInputs from "../../AddMoreInputs";

// TODO: fix emailjs error

const AddUsers = () => {
  const usersDefaultState = [{
    id: uuid(),
    name: "",
    email: "",
    added: false,
    addUserError: false,
    alreadyRegistered: false,
  }];

  const [users, setUsers] = useState(usersDefaultState);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserExists = useRequest("/user-exists");

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
        name: "",
        email: "",
        added: false,
        addUserError: false,
        alreadyRegistered: false,
      },
    ];

    setUsers(updatedUsers);
  };

  const onClickRemoveUser = (userId: string) => {
    const updatedUsers = users.filter((user) => userId !== user.id);

    setUsers(updatedUsers);
  };

  const onErrorAddingUser = (userId: string, alreadyRegistered = false) => {
    const userAlreadyRegisteredErrorOptions = { added: false, alreadyRegistered: true, addUserError: false };
    const errorOptions = { added: false, addUserError: true, alreadyRegistered: false };
    const usersAfterReg = updateUsers(users, userId, { ...(alreadyRegistered ? userAlreadyRegisteredErrorOptions : errorOptions) });

    setUsers(usersAfterReg);
    setIsLoading(false);
  };

  const onSuccessCheckUserExists = (userId: string, email: string, name: string) => {
    setIsLoading(false);
    sendRegEmail(userId, email, name);
  };

  const sendRegEmail = async (userId: string, email: string, name: string) => {
    try {
      const emailJsParams = getEmailJsParams(name, email);

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailJsParams)
      });

      const result = await response.json();

      if (!result.error) {
        const usersAfterReg = updateUsers(
          users,
          userId,
          {
            added: true,
            addUserError: false,
            alreadyRegistered: false
          }
        );

        setUsers(usersAfterReg);
      } else {
        onErrorAddingUser(userId);
      }
    } catch (error) {
      console.log(error);
      onErrorAddingUser(userId);
    }
  };

  const onHandleAddUser = async (event: FormSubmitEvent, email: string, name: string, userId: string) => {
    event.preventDefault();
    setIsLoading(true);

    checkUserExists({
      requestBody: { email },
      onSuccess: () => onSuccessCheckUserExists(userId, email, name),
      onError: onErrorAddingUser,
      onUserAlreadyRegisteredError: () => onErrorAddingUser(userId, true),
    });
  };

  return (
    <>
      <AdminHeader title="Add Users" />
      {users.map((user) => {
        return (
          <Form
            onSubmit={(e) => onHandleAddUser(e, user.email, user.name, user.id)}
            key={user.id}>
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <FormInput
                  formId="name"
                  label="Name"
                  type="text"
                  formGroupClassname="mb-2 me-4"
                  disabled={user.added}
                  value={user.name}
                  onChange={(e) => onChangeUser("name", user.id, e)} />
                <FormInput
                  formId="email"
                  label="Email"
                  formGroupClassname="mb-2"
                  type="email"
                  disabled={user.added}
                  value={user.email}
                  onChange={(e) => onChangeUser("email", user.id, e)} />
              </div>

              <div className="d-flex flex-row align-items-center mt-4">
                <Button
                  type="submit"
                  className="btn-secondary w-30 ms-4"
                  size="sm"
                  disabled={isLoading || user.added}>
                  Submit
                </Button>

                {user.alreadyRegistered
                  ? <XIcon text="User already exists" />
                  : null
                }

                {user.addUserError
                  ? <XIcon text="Error adding user" />
                  : null
                }

                {user.added
                  ? (
                    <TickIcon
                      stroke={colors.green}
                      className="ms-3" />
                  )
                  : null
                }

                {users?.length > 1 && !user.added
                  ? (
                    <RemoveInput
                      onClickFunction={() => onClickRemoveUser(user.id)}
                      margin="ms-2 mt-3" />
                  )
                  : null
                }
              </div>
            </div>
          </Form>
        );
      })}

      <AddMoreInputs
        title="Add another user"
        onClick={onClickAddNewUser}
        marginTop="mt-3" />
      <Button
        type="button"
        onClick={() => setUsers(usersDefaultState)}
        className="btn-danger">Clear all users</Button>
    </>
  );
};

export default AddUsers;

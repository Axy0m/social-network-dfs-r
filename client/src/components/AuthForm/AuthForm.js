import React, { useState } from "react";
import { Form, Input, Button, Card, Layout, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./styles";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../actions/authentication";
import { useDispatch } from "react-redux";

const { Title } = Typography;
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const onSubmit = (formValues) => {
    if (isLogin) {
      dispatch(login(formValues, navigate));
    } else dispatch(signup(formValues, navigate));
  };

  return (
    <Layout style={styles.container}>
      <Card
        style={styles.card}
        title={
          <Title level={4} style={{ textAlign: "center" }}>
            {isLogin ? "Connexion à " : "Rejoindre"} InstaSlut
          </Title>
        }
      >
        <Form
          name="authform"
          form={form}
          size="large"
          wrapperCol={{ span: 20, offset: 2 }}
          onFinish={onSubmit}
        >
          {isLogin || (
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Entrez votre pseudo",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nom utilisateur" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Veuillez entrer une adresse mail valide",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Adresse mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Entrez votre mot de passe",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mot de passe"
            />
          </Form.Item>
          {isLogin || (
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Repétez votre mot de passe",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirmez votre mot de passe"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isLogin ? "Venez !" : "Rejoindre"}
            </Button>
            <span style={{ margin: "0 10px 0 20px" }}>Ou</span>
            <Button type="link" onClick={switchMode}>
              {isLogin ? "Inscrivez-vous !" : "Déjà membre ?"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default AuthForm;

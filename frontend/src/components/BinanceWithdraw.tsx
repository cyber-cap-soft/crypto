import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { binanceWithdraw, getBinanceWithdrawStatus } from "../helpers/api";

interface IBinanceWithdrawProps {
  setIsShowStatus: Function;
}

const BinanceWithdrawForm: React.FC<IBinanceWithdrawProps> = ({
  setIsShowStatus,
}) => {
  const onFinish = (values: any) => {
    binanceWithdraw(
      values.apiKey,
      values.apiSecret,
      values.token,
      values.network,
      values.amountFrom,
      values.amountTo,
      values.wallets
    );
    setIsShowStatus(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 12 },
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Binance API key"
        name="apiKey"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Binance API secret"
        name="apiSecret"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Token" name="token" rules={[{ required: true }]}>
        <Input placeholder="ETH | BTC | USDT | ..." />
      </Form.Item>

      <Form.Item label="Network" name="network" rules={[{ required: true }]}>
        <Input placeholder="ETH | BSC | AVAXC | MATIC | ARBITRUM | OPTIMISM | APT | ..." />
      </Form.Item>

      <Form.Item
        label="Amount from"
        name="amountFrom"
        rules={[{ required: true }]}
      >
        <Input placeholder="0.1" />
      </Form.Item>

      <Form.Item label="Amount to" name="amountTo" rules={[{ required: true }]}>
        <Input placeholder="0.1" />
      </Form.Item>

      <Form.List name="wallets" initialValue={[""]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? "Wallets" : ""}
                required={true}
                key={field.key}
              >
                <Row gutter={10}>
                  <Col span={20}>
                    <Form.Item {...field} rules={[{ required: true }]} noStyle>
                      <Input placeholder="0x..." />
                    </Form.Item>
                  </Col>
                  {fields.length > 1 && (
                    <Col span={4}>
                      <Button
                        danger
                        style={{ width: "100%" }}
                        onClick={() => remove(field.name)}
                      >
                        Delete
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add wallet
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const BinanceWithdrawStatus: React.FC<IBinanceWithdrawProps> = ({
  setIsShowStatus,
}) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const effect = async () => {
      const status = await getBinanceWithdrawStatus();
      setStatus(status);
    };

    const statusInterval = setInterval(effect, 1000);

    return () => {
      clearInterval(statusInterval);
    };
  });

  return (
    <>
      <div>
        {status.split("\n").map((status, index) => (
          <p key={index}>{status}</p>
        ))}
      </div>
      <br />
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => setIsShowStatus(false)}
      >
        Close status
      </Button>
    </>
  );
};

const BinanceWithdraw: React.FC = () => {
  const [isShowStatus, setIsShowStatus] = useState(false);

  return isShowStatus ? (
    <BinanceWithdrawStatus setIsShowStatus={setIsShowStatus} />
  ) : (
    <BinanceWithdrawForm setIsShowStatus={setIsShowStatus} />
  );
};

export default BinanceWithdraw;

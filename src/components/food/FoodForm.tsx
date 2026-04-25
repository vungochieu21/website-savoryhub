"use client";    /* Use Ant Design */

import { useState } from "react";
import {
  Modal,
  Input,
  Select,
  Button,
  TimePicker,
  Upload,
  InputNumber,
  Form,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useLanguage } from "src/locales/context/LanguageContext";

export default function FoodForm({ onClose, onSave }: any) {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    address: "",
    province: "",
    district: "",
    map: "",
    phone: "",
    openTime: "",
    closeTime: "",
    minPrice: "",
    maxPrice: "",
    description: "",
    image: "",
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImage = (info: any) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const url = URL.createObjectURL(file);
    handleChange("image", url);
  };

  return (
    <Modal
      open
      title={t("form_required")}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      style={{ top: 80 }}
    >
      <Form layout="vertical">

        {/* NAME */}
        <Form.Item label={t("place_name")} required>
          <Input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item label={t("address")} required>
          <Input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </Form.Item>

        {/* CITY */}
        <Form.Item label={t("select_city")}>
          <Select
            value={form.province}
            onChange={(value) => handleChange("province", value)}
            options={[
              { value: "vietnam", label: "Vietnam" },
              { value: "usa", label: "USA" },
              { value: "japan", label: "Japan" },
            ]}
          />
        </Form.Item>

        {/* DISTRICT */}
        <Form.Item label={t("enter_district")}>
          <Input
            value={form.district}
            onChange={(e) => handleChange("district", e.target.value)}
          />
        </Form.Item>

        {/* MAP */}
        <Form.Item label={t("map_link")}>
          <Input
            value={form.map}
            onChange={(e) => handleChange("map", e.target.value)}
          />
        </Form.Item>

        {/* PHONE */}
        <Form.Item label={t("phone")}>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Form.Item>

        {/* TIME */}
        <div style={{ display: "flex", gap: 10 }}>
          <Form.Item label={t("open_time")} style={{ flex: 1 }}>
            <TimePicker
              style={{ width: "100%" }}
              value={form.openTime ? dayjs(form.openTime, "HH:mm") : null}
              format="HH:mm"
              onChange={(time, timeString) =>
                handleChange("openTime", timeString)
              }
            />
          </Form.Item>

          <Form.Item label={t("close_time")} style={{ flex: 1 }}>
            <TimePicker
              style={{ width: "100%" }}
              value={form.closeTime ? dayjs(form.closeTime, "HH:mm") : null}
              format="HH:mm"
              onChange={(time, timeString) =>
                handleChange("closeTime", timeString)
              }
            />
          </Form.Item>
        </div>

        {/* PRICE */}
        <div style={{ display: "flex", gap: 10 }}>
          <Form.Item label={t("price_min")} style={{ flex: 1 }}>
            <InputNumber
              style={{ width: "100%" }}
              value={form.minPrice}
              onChange={(value) => handleChange("minPrice", value)}
            />
          </Form.Item>

          <Form.Item label={t("price_max")} style={{ flex: 1 }}>
            <InputNumber
              style={{ width: "100%" }}
              value={form.maxPrice}
              onChange={(value) => handleChange("maxPrice", value)}
            />
          </Form.Item>
        </div>

        {/* DESCRIPTION */}
        <Form.Item label={t("description")}>
          <Input.TextArea
            maxLength={300}
            rows={3}
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />
        </Form.Item>

        {/* IMAGE */}
        <Form.Item label={t("choose_image")}>
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={handleImage}
          >
            <Button icon={<UploadOutlined />}>
              {t("choose_image")}
            </Button>
          </Upload>
        </Form.Item>

        {/* ACTION BUTTON */}
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => onSave?.(form)}
          >
            {t("save")}
          </Button>
        </div>

      </Form>
    </Modal>
  );
}
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../store/settings";
import "../styles/Settings.css";

const Settings = ({ show, onHide }) => {
    const dispatch = useDispatch()
    const scaleOnHover = useSelector(state => state.settings.taskScaleOnHover)

    const [hoverScaleSetting, handleHoverScaleSetting] = useState(scaleOnHover)
    
    const saveSettings = () => {
        dispatch(settingsActions.toggleScaleOnHover(hoverScaleSetting))

        onHide(true)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="settingsContainer text-light"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Toggle scale on hover."
                        checked={hoverScaleSetting}
                        onChange={(e)=>handleHoverScaleSetting(e.target.checked)}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Close
                </Button>
                <Button variant="success" onClick={saveSettings}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Settings;

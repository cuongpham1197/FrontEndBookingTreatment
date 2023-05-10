import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './TreatmentDetailModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from 'react-toastify';
import moment from "moment";
import { CommonUtils } from "../../../utils";

class TreatmentDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendTreatmentDetail = () => {
        this.props.sendTreatmentDetail(this.state)
    }

    render() {
        let { isOpenModal, closeTreatmentDetailModal, dataModal, sendTreatmentDetail } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="md"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi chi tiết liệu trình</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeTreatmentDetailModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className='col-6 form-group'>
                            <label>Email khách hàng</label>
                            <input className="form-control" type='email' value={this.state.email}
                                onChange={(event) => { this.handleOnChangeEmail(event) }}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Chọn file liệu trình</label>
                            <input className="form-control-file" type='file'
                                onChange={(event) => { this.handleOnChangeImage(event) }}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleSendTreatmentDetail() }}>Send</Button>{' '}
                    <Button color="secondary" onClick={closeTreatmentDetailModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentDetailModal);
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageTreatment.scss';
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { createNewTreatment } from '../../../services/userService';
import { toast } from "react-toastify";
import Lightbox from 'react-image-lightbox';

const mdParser = new MarkdownIt(/* Markdown IT options */);

class ManageTreatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

            previewImgURL: '',
            isOpen: false,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
                previewImgURL: objectUrl,
            })
        }
    }

    handleSaveNewTreatment = async () => {
        let res = await createNewTreatment(this.state)

        if (res && res.errCode === 0) {
            toast.success('Save treatment successfully')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Save treatment failed') //
            console.log('check saveNewtreatment:', res)
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        return (
            <div className="manage-treatment-container">
                <div className="ms-title">Quản lý liệu trình</div>

                <div className="add-new-treatment row">
                    <div className="col-6 form-group">
                        <label>Tên liệu trình</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        {/* <label>Ảnh liệu trình</label>
                        <input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                        /> */}
                        <label>Ảnh liệu trình</label>
                        <div className='preview-img-container'>
                            <input id="previewImg" type='file' hidden
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                            <label className='label-upload'
                                htmlFor='previewImg'>
                                <FormattedMessage id="manage-user.upload-image" /> <i className="fas fa-upload"></i>
                            </label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}

                                onClick={() => this.openPreviewImage()}>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12">
                        <button className="btn-save-treatment"
                            onClick={() => this.handleSaveNewTreatment()}>
                            Lưu thông tin
                        </button>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTreatment);
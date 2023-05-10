import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageShop.scss';
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { createNewShop } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* MarkdownIT options */)

class ManageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

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
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewShop = async () => {
        let res = await createNewShop(this.state)

        if (res && res.errCode === 0) {
            toast.success('Save shop successfully')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Save shop failed') //
            console.log('check saveNewShop:', res)
        }
    }
    render() {
        return (
            <div className="manage-treatment-container">
                <div className="ms-title">Quản lý cửa hàng</div>

                <div className="add-new-treatment row">
                    <div className="col-6 form-group">
                        <label>Tên cửa hàng</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Ảnh cửa hàng</label>
                        <input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Địa chỉ cửa hàng</label>
                        <input className="form-control" type="text" value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
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
                            onClick={() => this.handleSaveNewShop()}>
                            Save
                        </button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageShop);
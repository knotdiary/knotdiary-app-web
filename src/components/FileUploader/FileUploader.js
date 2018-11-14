import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { FiUpload, FiX } from 'react-icons/fi';

import { Spinner } from 'components';
import './FileUploader.scss';

class FileUploader extends PureComponent {
  static propTypes = {
    file: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    inputId: PropTypes.string,
    icon: PropTypes.any,
    className: PropTypes.string,
    fileTypes: PropTypes.string,
    showPreview: PropTypes.bool,
    multiple: PropTypes.bool,
  };

  static defaultProps = {
    file: '',
    inputId: uuid(),
    icon: <FiUpload />,
    className: '',
    fileTypes: 'image/jpeg, image/jpg, image/png',
    showPreview: false,
    multiple: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      imagePreview: null,
      file: this.props.file,
      fileReader: this.props.showPreview ? new FileReader() : null,
      isBusy: false,
    };
  }

  componentWillMount = () => {
    const { file } = this.props;
    if (file && file.name) {
      this.setFilePreview(file);
    }
  }

  componentWillUnmount = () => {
    const { fileReader } = this.state;
    if (fileReader && fileReader.onload) {
      fileReader.onload = null;
      this.setState({ fileReader });
    }
  }

  setFilePreview = (file) => {
    if (this.state.imagePreview) {
      return;
    }

    const { fileReader } = this.state;
    if (!fileReader) {
      return;
    }

    fileReader.onload = (ev) => {
      this.setState({ imagePreview: ev.target.result, isBusy: false, fileReader });
    }

    fileReader.readAsDataURL(file);
  }

  onFileChange = (ev) => {
    if (this.state.isBusy) {
      return;
    }
    this.setState({ isBusy: true });

    const { showPreview, onChange } = this.props;
    ev.persist();

    if (showPreview) {
      if (ev.target.files && ev.target.files[0]) {
        this.setFilePreview(ev.target.files[0]);
      }
    }

    onChange(ev);
  }

  onRemoveFile = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    if (this.props.onClear) {
      this.props.onClear(this.props.file);
    }
  }

  renderIcon = (icon, imagePreview) => {
    return !imagePreview ? icon : null;
  }

  render() {
    const { className, inputId, fileTypes, icon, showPreview, onClear, multiple } = this.props;
    const { imagePreview, isBusy } = this.state;

    return (
      <div className={`file-uploader ${className}`}>
        <input type="file" id={inputId} name={inputId} onChange={this.onFileChange} accept={fileTypes} multiple={multiple} />
        <label htmlFor={inputId} className={showPreview && imagePreview ? 'has-preview' : ''}>
          {
            this.renderIcon(icon, imagePreview)
          }
          {
            showPreview && imagePreview && (
              <Spinner isLoading={isBusy}>
                <div className="file-uploader--preview">
                  {
                    onClear && (
                      <div role="menuitem" className="file-uploader--preview-remove" onClick={this.onRemoveFile}>
                        <FiX />
                      </div>
                    )
                  }
                  <img src={imagePreview} alt={inputId} />
                </div>
              </Spinner>
            )
          }
        </label>
      </div>
    )
  }
}

export default FileUploader;

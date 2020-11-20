import React, {Component} from 'react'
// antd
import { Upload, Icon, message, Modal } from 'antd';
// config
import { IMAGE_URL } from '../config'
interface IProps {
  onRef: (ref: any) => void;
  imageName?: string;
  disabled?: boolean;
}
class PictureWall extends Component<IProps> {
  static defaultProps = {
    imageName: '',
    disabled: false,
  }
  public state = {
    loading: false,
    previewImage: '',
    imageUrl: '',
    previewVisible: false,
    imageName: this.props.imageName?this.props.imageName:''
  };
  componentWillReceiveProps (nextProps: IProps, nextState: any) {
    // console.log('componentWillReceiveProps()', nextProps)
    const { imageName } = nextProps
    this.setState({
      imageUrl: this.state.imageUrl?this.state.imageUrl:imageName?IMAGE_URL + imageName:'',
      imageName: this.state.imageName?this.state.imageName:imageName?imageName:''
    })
  }
  private handleChange = (data: any) => {
    let { file } = data
    if (file.status === 'uploading') {
      this.setState({
        loading: true
      })
      return;
    }
    if (file.status === 'done') {
      const result = file.response
      console.log(result)
      if (result.erron === 0) {
        message.success('上传图片成功')
        const { name, url } = result.data
        file.name = name
        file.url = url
        this.setState({
          imageUrl: url || file.preview,
          imageName: name || '',
          loading: false
        })
      } else {
        message.error('上传图片失败')
        this.setState({
          loading: false
        })
      }
    }
  };
  private getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result!)
      reader.onerror = error => reject(error)
    })
  }
  private beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('您只能上传JPG / PNG文件！');
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('图片必须小于4MB！');
    }
    return isJpgOrPng && isLt4M;
  }
  private handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }
  public getImg = () => {
    return this.state.imageName
  }
  componentDidMount () {
    this.props.onRef(this)
  }
  render() {
    const { disabled } = this.props
    const { previewVisible, previewImage } = this.state
    const UploadButton = (
    <div>
      <Icon type={this.state.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text" > 上传 </div>
    </div>
    );
    const { imageUrl } = this.state;
    return (
      <>
        <Upload
          disabled={disabled}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/sys/updatefile"
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : UploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={() => {
          this.setState({
            previewVisible: false
          })
        }}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PictureWall
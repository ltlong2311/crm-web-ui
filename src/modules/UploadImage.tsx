import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { ShareUploadImage } from '@components';
import { LogApp } from '@utils';
import { MAXIMUM_IMAGE_SIZE } from '@configs';

interface IProps {
  typeUpload?: 'button' | 'image' | 'change';
  defaultUrl?: string;
  previewImageStyle?: 'contain' | 'cover';
  btnUploadText?: string;
  onUploadEnd?: (file?: any) => void;
}

export const UploadImageModule = (props: IProps) => {
  const { typeUpload = 'button', defaultUrl, previewImageStyle = 'contain', btnUploadText, onUploadEnd } = props;
  const uploadBtnRef = useRef<HTMLInputElement>();

  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  LogApp('IMAGE_UPLOAD', selectedImage);
  LogApp('IMAGE URL', previewUrl);

  const handleUpload = () => {
    uploadBtnRef && uploadBtnRef?.current?.click();
  };

  const handleChangeImage = (e: ChangeEvent<any>) => {
    LogApp('changeImg');
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      onUploadEnd && onUploadEnd(undefined);
      return;
    }
    const file = e.target.files[0];
    if (file?.size <= MAXIMUM_IMAGE_SIZE) {
      setError('');
      setSelectedImage(e.target.files[0]);
    } else {
      e.target.value = null;
      if (typeUpload === 'button') {
        setError('Hình ảnh tải lên tối đa là 1MB');
      } else {
        setError('Hình ảnh tải lên tối đa là 1MB');
        toast.warning('Hình ảnh tải lên tối đa là 1MB!', {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
        });
      }
    }

    onUploadEnd && onUploadEnd(e.target.files[0]);
  };

  return (
    <ShareUploadImage
      previewImageStyle={previewImageStyle}
      onUpload={handleUpload}
      uploadBtnRef={uploadBtnRef}
      onChangeImage={handleChangeImage}
      previewUrl={previewUrl}
      typeUpload={typeUpload}
      selectedImage={selectedImage}
      defaultUrl={defaultUrl}
      error={error}
      btnUploadText={btnUploadText}
    />
  );
};

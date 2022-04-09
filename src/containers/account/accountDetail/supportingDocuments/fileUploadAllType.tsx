import { Audiotrack, Description, PictureAsPdf, Theaters } from '@mui/icons-material'
import { DropzoneArea } from 'material-ui-dropzone'
import React, { ReactElement } from 'react'

interface Props {
  fileObject: any;
  classes: any;
}

function DocumentUploads({ fileObject, classes }: Props): ReactElement {
  const handlePreviewIcon = () => {
    const { type } = fileObject.file
    const iconProps = {
      className: classes.image,
    }

    if (type.startsWith("video/")) return <Theaters {...iconProps} />
    if (type.startsWith("audio/")) return <Audiotrack {...iconProps} />

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} />
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />
      default:
        return <PictureAsPdf {...iconProps} />
    }
  }
  return (
    <div>
      <DropzoneArea
        getPreviewIcon={handlePreviewIcon}
      />
    </div>
  )
}

export default DocumentUploads

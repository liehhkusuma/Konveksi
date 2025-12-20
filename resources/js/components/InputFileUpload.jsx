import { usePage } from '@inertiajs/react';
import * as React from 'react';


import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Grid, Stack, Tooltip } from '@mui/material';
import { DocumentUpload, Image } from 'iconsax-react';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import IconButton from '@/components/@extended/IconButton';
import { ImagePath, getImageUrl } from '@/utils/getImageUrl';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ name, data = '', setData }) {

    const { ziggy } = usePage().props;
    const urlUploads = ziggy.uploads;

    const [cFile, setCFile] = React.useState(null);
    const [preview, setPreview] = React.useState(null);

    React.useEffect(() => {
        if (cFile) {
            setPreview(URL.createObjectURL(cFile));
        } else if (data) {
            setPreview(getImageUrl(urlUploads, data));
        }
    }, [cFile]);

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<DocumentUpload />}
            >
                Upload
                <VisuallyHiddenInput
                    name={name}
                    type="file"
                    onChange={(e) => {
                        setData(name, e.target.files[0])
                        setCFile(e.target.files[0]);
                    }}
                />
            </Button>
            {preview && (<PhotoProvider>
                <PhotoView src={preview}>
                    <Tooltip title="Preview">
                        <IconButton
                            variant="outlined"
                        >
                            <Image size={28} />
                        </IconButton>
                    </Tooltip>
                </PhotoView>
            </PhotoProvider>)}
        </Stack>
    );
}
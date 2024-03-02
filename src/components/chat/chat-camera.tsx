'use client'

import { useEffect, useRef, useState } from 'react'

import { previewImg } from '~/lib/utils'
import { Camera } from '~/assets/icons'
import ImagePreviewDialog from './image-preview-dialog'
import SelectUserDialog from './select-user-dialog'

const ChatCamera = () => {
    const imgRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<string>('')
    const [step, setStep] = useState(0)

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const dataUrl = previewImg(file)
            setSelectedFile(dataUrl)
        }

        event.target.value = null!
    }

    const closeDialog = () => {
        setSelectedFile('')
        setStep(0)
    }

    useEffect(() => {
        return () => {
            selectedFile && URL.revokeObjectURL(selectedFile)
        }
    }, [selectedFile])

    return (
        <>
            <div className="aspect-[9/16] flex flex-col items-center justify-center h-[80%] bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-sigColorBgBorder mx-auto lg:mx-0">
                <div
                    className="rounded-full p-8 bg-white-800 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-100 cursor-pointer"
                    onClick={() => imgRef.current!.click()}
                >
                    <Camera height={150} className="hover:opacity-90" />

                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={imgRef}
                        onChange={handleFileChange}
                    />
                </div>
                <p className="w-2/3 text-center text-white mt-4 font-semibold">
                    Click the Camera to send your Code.
                </p>
            </div>
            {step === 0 ? (
                selectedFile && (
                    <ImagePreviewDialog
                        selectedFile={selectedFile}
                        onClose={closeDialog}
                        onImageChange={() => imgRef.current!.click()}
                        setStep={setStep}
                    />
                )
            ) : (
                <SelectUserDialog
                    selectedFile={selectedFile}
                    onClose={closeDialog}
                    onPrev={() => setStep(0)}
                />
            )}
        </>
    )
}
export default ChatCamera

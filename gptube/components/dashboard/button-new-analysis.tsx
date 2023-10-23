import { useMemo, useState } from 'react'
import {
  Input,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useDebounce } from 'use-debounce'

import { youtubeURLRegex } from '@/utils'
import { useVideoPreview } from '@/hooks/use-video-preview'

import { Button } from '../Common/button'

import { VideoPreview } from './video-preview'

export function ButtonNewAnalysis() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [showEmail, setShowEmail] = useState(false)
  const [debouncedUrl] = useDebounce(url, 500)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isLoading, isSuccess, isError, dataPreAnalysis } = useVideoPreview(debouncedUrl)

  const validateYoutubeURL = (inputUrl: string) => inputUrl.match(youtubeURLRegex)
  const validateEmail = (inputEmail: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.exec(inputEmail)

  const isInvalidURL = useMemo(() => {
    if (url === '') return false

    return validateYoutubeURL(url) ? false : true
  }, [url])

  const isInvalidEmail = useMemo(() => {
    if (email === '') return false

    return validateEmail(email) ? false : true
  }, [email])


  return (
    <>
      <Button
        className="font-medium text-success hover:!text-white"
        color="success"
        radius="sm"
        variant="ghost"
        onPress={onOpen}
      >
        New Analysis
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                New video analysis
              </ModalHeader>
              <ModalBody className="text-sm">
                <div className="flex">
                  <div className="w-1/2">
                    <p className="text-sm">Paste a youtube video url to start the analysis</p>
                    <Input
                      color={isInvalidURL || isError ? 'danger' : 'success'}
                      errorMessage={
                        isInvalidURL
                          ? 'Please enter a valid Url'
                          : isError
                          ? 'Something is wrong with the Url (check the video id)'
                          : null
                      }
                      isInvalid={isInvalidURL}
                      label="Url"
                      name="videoURL"
                      placeholder="https://youtu.be/mv5SZ7i6QLI"
                      type="url"
                      value={url}
                      variant="underlined"
                      onValueChange={setUrl}
                    />
                    <Checkbox
                      classNames={{
                        label: 'text-sm',
                        icon: 'text-white',
                      }}
                      color="success"
                      isSelected={showEmail}
                      radius="sm"
                      size="md"
                      onValueChange={setShowEmail}
                    >
                      Send to email
                    </Checkbox>
                    {showEmail ? (
                      <Input
                        color={isInvalidEmail ? 'danger' : 'success'}
                        errorMessage={isInvalidEmail ? 'Please enter a valid E-mail' : null}
                        isInvalid={isInvalidEmail}
                        label="E-mail"
                        name="email"
                        placeholder="you@email.com"
                        type="email"
                        value={email}
                        variant="underlined"
                        onValueChange={setEmail}
                      />
                    ) : null}
                  </div>
                  <div className="w-1/2">
                    <VideoPreview
                      preview={{
                        isSuccess: isSuccess,
                        isLoading: isLoading,
                        previewData: dataPreAnalysis,
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="font-medium text-success"
                  color="success"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="font-medium text-white hover:!bg-success-400"
                  color="success"
                  onPress={onClose}
                >
                  Start
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

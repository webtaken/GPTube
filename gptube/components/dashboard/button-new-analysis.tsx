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

import { useVideoPreview } from '@/hooks/use-video-preview'
import { isValidEmail, isValidYoutubeUrl } from '@/utils/validations.utils'
import { useForm } from '@/hooks/use-form'

import { Button } from '../Common/button'

import { VideoPreview } from './video-preview'

export function ButtonNewAnalysis() {
  const { handleChange, email, showEmail, url } = useForm({
    url: '',
    email: '',
    showEmail: false,
  })

  const [debouncedUrl] = useDebounce(url, 500)
  const modalAnalysis = useDisclosure()
  const videoPreviewQuery = useVideoPreview(debouncedUrl)

  const isInvalidUrl = url === '' || !isValidYoutubeUrl(url)
  const isInvalidEmail = email === '' || !isValidEmail(email)

  return (
    <>
      <Button
        className="font-medium text-success hover:!text-white"
        color="success"
        radius="sm"
        variant="ghost"
        onPress={modalAnalysis.onOpen}
      >
        New Analysis
      </Button>
      <Modal isOpen={modalAnalysis.isOpen} onOpenChange={modalAnalysis.onOpenChange}>
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
                      color={isInvalidUrl || videoPreviewQuery.isError ? 'danger' : 'success'}
                      errorMessage={
                        isInvalidUrl
                          ? 'Please enter a valid Url'
                          : videoPreviewQuery.isError
                          ? 'Something is wrong with the Url (check the video id)'
                          : null
                      }
                      isInvalid={isInvalidUrl}
                      label="Url"
                      name="videoURL"
                      placeholder="https://youtu.be/mv5SZ7i6QLI"
                      type="url"
                      value={url}
                      variant="underlined"
                      onValueChange={value => {
                        handleChange({
                          name: 'url',
                          value: value,
                        })
                      }}
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
                      onValueChange={value => {
                        handleChange({
                          name: 'showEmail',
                          value: value,
                        })
                      }}
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
                        onValueChange={value => {
                          handleChange({
                            name: 'email',
                            value: value,
                          })
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="w-1/2">
                    <VideoPreview {...videoPreviewQuery} />
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

import {
  Input,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Divider,
  ScrollShadow,
} from '@nextui-org/react'
import { useDebounce } from 'use-debounce'

import { useVideoPreview } from '@/hooks/use-video-preview'
import { isValidEmail, isValidYoutubeUrl } from '@/utils/validations.utils'
import { useForm } from '@/hooks/use-form'
import { useAuth } from '@/hooks/use-auth'

import { Button } from '../Common/button'

import { VideoPreview } from './video-preview'

export function ButtonNewAnalysis() {
  const { user } = useAuth()
  const { handleChange, email, showEmail, url } = useForm({
    url: '',
    email: user?.email || '',
    showEmail: true,
  })

  const [debouncedUrl] = useDebounce(url, 500)
  const modalAnalysis = useDisclosure()
  const videoPreviewQuery = useVideoPreview(debouncedUrl)

  const isInvalidUrl = !isValidYoutubeUrl(url)
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
      <Modal isOpen={modalAnalysis.isOpen} size="4xl" onOpenChange={modalAnalysis.onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>New video analysis</ModalHeader>
              <ModalBody className="text-sm">
                <section className="grid grid-cols-[300px_10px_1fr] gap-6">
                  <aside className="flex flex-col gap-3">
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
                  </aside>
                  <Divider orientation="vertical" />
                  <ScrollShadow className="w-full max-h-96" offset={0} size={0}>
                    <VideoPreview {...videoPreviewQuery} />
                  </ScrollShadow>
                </section>
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

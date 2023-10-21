import { useMemo, useState } from 'react';
import { extractYTVideoID, youtubeURLRegex } from '@/utils';
import { Button } from '../Common/button'
import { Input, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useDebounce } from 'use-debounce';

export function ButtonNewAnalysis() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [debouncedUrl] = useDebounce(url, 500);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validateYoutubeURL = (url: string) => url.match(youtubeURLRegex)
  const validateEmail = (email: string) => email.match(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
  );

  const isInvalidURL = useMemo(() => {
    if (url === "") return false;
    return validateYoutubeURL(url) ? false : true;
  }, [url]);

  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">New video analysis</ModalHeader>
              <ModalBody className='text-sm'>
                <p className='text-sm'>Paste a youtube video url to start its analysis</p>
                <Input type="url" variant="underlined" label="Url" placeholder='https://youtu.be/mv5SZ7i6QLI'
                  errorMessage={isInvalidURL && "Please enter a valid Url"}
                  color={isInvalidURL ? "danger" : "success"}
                  isInvalid={isInvalidURL}
                  value={url}
                  onValueChange={setUrl}
                />
                <Checkbox
                  size="md"
                  radius="sm"
                  color="success"
                  className='focus:!ring-success-400'
                  isSelected={showEmail}
                  onValueChange={setShowEmail}
                >
                  Send to email
                </Checkbox>
                {showEmail &&
                  <Input type="email" variant="underlined" label="E-mail" placeholder='you@email.com'
                    errorMessage={isInvalidEmail && "Please enter a valid E-mail"}
                    color={isInvalidEmail ? "danger" : "success"}
                    isInvalid={isInvalidEmail}
                    value={email}
                    onValueChange={setEmail}
                  />
                }

                <p>
                  url to analyze: {debouncedUrl}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" className="font-medium text-success" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" className="font-medium text-white hover:!bg-success-400" onPress={onClose}>
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

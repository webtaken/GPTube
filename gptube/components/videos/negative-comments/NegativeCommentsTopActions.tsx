/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoNegativeCommentsRespBody } from '@/gptube-api'

import {
  Skeleton,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Pagination,
  Input,
} from '@nextui-org/react'

import { DEFAULT_PAGE_PAGINATION } from '@/constants/general.constants'

interface NegativeCommentsTopActionsProps extends ModelsYoutubeVideoNegativeCommentsRespBody {
  isLoading: boolean
  page: number
  pageSize: number
  totalPages: number
  isFetching: boolean
  isErrorComments: boolean
  pageChangeHandler: (currentPage: number) => void
  pageSizeChangeHandler: (newPageSize: number) => void
}

export function NegativeCommentsTopActions({
  count,
  isLoading,
  totalPages,
  pageSize,
  pageChangeHandler,
  pageSizeChangeHandler,
  isFetching,
  isErrorComments,
}: NegativeCommentsTopActionsProps) {
  // TODO: the actions will be:
  // Sorting by date (sort comments by date).
  // Block negative comments (block harmful comments by the creator).
  // Show emotions of the comments (this could be saved on the database or done directly by the user calling the API).
  // Show most relevant comments (implement an algorithm for this, consider like count, replies count, etc).
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <section>
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-6 w-[400px] rounded-md" />
          </div>
        ) : (
          <>
            <p className="flex items-center gap-2 font-semibold text-xl text-ellipsis">
              Negative Comments
            </p>
            <p className="text-sm">
              <span className="font-semibold">{count}</span> comments found
            </p>
          </>
        )}
      </section>
      {!isLoading && (
        <div className="flex items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Input
                isReadOnly
                className="w-32"
                label="Show comments"
                placeholder="10 comments"
                size="sm"
                type="text"
                value={`${pageSize}`}
                variant="flat"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onAction={key => {
                switch (key.toString()) {
                  case '10-rows':
                    pageSizeChangeHandler(10)
                    break
                  case '30-rows':
                    pageSizeChangeHandler(30)
                    break
                  default:
                    pageSizeChangeHandler(50)
                    break
                }
              }}
            >
              <DropdownItem key="10-rows">10 comments</DropdownItem>
              <DropdownItem key="30-rows">30 comments</DropdownItem>
              <DropdownItem key="50-rows">50 comments</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Pagination
            isCompact
            showControls
            color="success"
            defaultValue={DEFAULT_PAGE_PAGINATION}
            isDisabled={isFetching || isErrorComments}
            total={totalPages}
            onChange={pageChangeHandler}
          />

          <Dropdown>
            <DropdownTrigger>
              <Button className="text-sm font-medium bg-transparent border rounded-lg shadow hover:shadow-lg">
                Actions
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              disabledKeys={['delete', 'emotions', 'relevant']}
            >
              <DropdownItem key="emotions">Discover emotions</DropdownItem>
              <DropdownItem key="relevant">Relevant comments</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Mark not negative
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  )
}

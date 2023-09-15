import { Button, Modal } from '@shared/ui'
import { useState } from 'react'
import { HiOutlineStar } from 'react-icons/hi2'
import FavoriteAddForm from './FavoriteAddForm'

export default function FavoriteAddModal() {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Modal
        className="fav-add-modal"
        size="sm"
        visible={visible}
        onVisibleChange={setVisible}
        title="Add to your favorites"
        triggerBy={
          <div>
            <Button
              leadingIcon={<HiOutlineStar />}
              title="Add to favorites"
              className="fixed-craete-btn"
            />
          </div>
        }
        content={
          <>
            <FavoriteAddForm setVisible={setVisible} />
          </>
        }
      />
    </div>
  )
}

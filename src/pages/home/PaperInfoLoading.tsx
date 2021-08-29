import Skeleton from "@material-ui/lab/Skeleton"
import React from 'react'

const PaperInfoLoading = () => {
  return (
    <>
      {/* Title */}
      <div className="flex-auto w-50 pt2 pb4">
        <Skeleton variant="text" animation={'wave'} height={35} />
      </div>
      <div className="flex flex-row pb5">
        <div className="flex-auto flex-column w-80">
          {/* Abstract */}
          <div className="flex-auto w-20">
            <Skeleton variant="text" animation={'wave'} height={30} />
          </div>
          <div className="flex-auto w-80">
            <Skeleton variant="text" animation={'wave'} />
          </div>
          <div className="flex-auto w-80">
            <Skeleton variant="text" animation={'wave'} />
          </div>
          <div className="flex-auto w-80">
            <Skeleton variant="text" animation={'wave'} />
          </div>
          <div className="flex-auto w-70">
            <Skeleton variant="text" animation={'wave'} />
          </div>
        </div>
        <div className="flex-auto flex-column w-20">
          {/* Authors */}
          <div className="flex-auto w-60">
            <Skeleton variant="text" animation={'wave'} height={30} />
          </div>
          <div className="flex-auto w-90">
            <Skeleton variant="text" animation={'wave'} />
          </div>
          <div className="flex-auto w-80">
            <Skeleton variant="text" animation={'wave'} />
          </div>
          <div className="flex-auto">
            <Skeleton variant="text" animation={'wave'} />
          </div>
        </div>
      </div>
      {/* Cited */}
      <div className="flex-auto w-20">
        <Skeleton variant="text" animation={'wave'} height={30} />
      </div>
      <div className="flex-auto w-40">
        <Skeleton variant="text" animation={'wave'} />
      </div>
      <div className="flex-auto w-30">
        <Skeleton variant="text" animation={'wave'} />
      </div>
      <div className="flex-auto w-40 pb4">
        <Skeleton variant="text" animation={'wave'} />
      </div>
      {/* Cited By */}
      <div className="flex-auto w-20">
        <Skeleton variant="text" animation={'wave'} height={30} />
      </div>
      <div className="flex-auto w-30">
        <Skeleton variant="text" animation={'wave'} />
      </div>
      <div className="flex-auto w-40">
        <Skeleton variant="text" animation={'wave'} />
      </div>
    </>
  )
}

export default PaperInfoLoading
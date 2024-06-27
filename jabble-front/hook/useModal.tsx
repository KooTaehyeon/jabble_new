"use client";

import { useMemo } from "react";
import { useOverlay } from "./useOverlay";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * @refer https://github.com/toss/slash/blob/main/packages/react/use-overlay/src/useOverlay.ko.md
 */
export function useModal<T extends ModalProps>(Modal: React.ComponentType<T>) {
  const overlay = useOverlay();

  return useMemo(
    () => ({
      open: function (props?: Omit<T, "open" | "onClose" | "onConfirm">) {
        return new Promise<boolean>((resolve) => {
          overlay.open(({ isOpen, close, exit }) => (
            <div className="fixed top-0 w-screen  h-screen bg-[#000000] bg-opacity-50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col bg-white rounded-sm border-none outline-none box-border">
                  <Modal
                    {...(props as T)}
                    open={isOpen}
                    onClose={() => {
                      resolve(false);
                      exit();
                    }}
                    onConfirm={() => {
                      resolve(true);
                      exit();
                    }}
                  />
                </div>
              </div>
            </div>
          ));
        });
      },
      close: overlay.close,
    }),
    [overlay]
  );
}

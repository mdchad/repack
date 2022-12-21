import { useLayer, Arrow } from 'react-laag';
import {
    motion,
    AnimatePresence,
    useDragControls,
    Reorder
} from 'framer-motion';
import { useState } from 'react';
import {
    ArrowsRightLeftIcon,
    LockOpenIcon,
    LockClosedIcon
} from '@heroicons/react/24/solid';
import { Square2StackIcon } from '@heroicons/react/24/outline';
import chroma from 'chroma-js';
import notification from '@/utils/toast-helper';

function PopoverMenu({ bgColor, setLockColor, lockColor, index, paletteLock }: any) {
    const style = { backgroundColor: bgColor };
    const [isOpen, setOpen] = useState(false);
    const [pointerGrabbing, setPointerGrabbing] = useState(false);
    const controls = useDragControls();

    // helper function to close the menu
    function close() {
        setOpen(false);
    }

    const { renderLayer, triggerProps, layerProps } = useLayer({
        isOpen,
        onOutsideClick: close, // close the menu when the user clicks outside
        onDisappear: close, // close the menu when the menu gets scrolled out of sight
        overflowContainer: false, // keep the menu positioned inside the container
        auto: true, // automatically find the best placement
        placement: 'bottom-center', // we prefer to place the menu "top-end"
        triggerOffset: 12, // keep some distance to the trigger
        containerOffset: 16, // give the menu some room to breath relative to the container
        arrowOffset: 16 // let the arrow have some room to breath also
    });

    function pointerEvent(bool: any) {
        setPointerGrabbing(bool);
    }

    function copyColor() {
        navigator.clipboard.writeText(bgColor);

        notification(null, '', 'Color copied to clipboard!')
    }

    function onLockingColor() {        
        if (lockColor[index] === bgColor) {
            delete lockColor[index]
            paletteLock.current = { ...lockColor }
            setLockColor({ ...lockColor });
        } else {
            paletteLock.current = { ...lockColor, [index]: bgColor }
            setLockColor({ ...lockColor, [index]: bgColor });
        }
    }

    // Again, we're using framer-motion for the transition effect
    return (
        <Reorder.Item
            key={bgColor}
            value={bgColor}
            onPointerDown={() => pointerEvent(true)}
            onPointerUp={() => pointerEvent(false)}
            dragListener={false}
            dragControls={controls}
        >
            <div
                {...triggerProps}
                style={style}
                key={bgColor}
                className="mr-2 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setOpen(!isOpen)}
            >
                <AnimatePresence>
                    {Object.values(lockColor).includes(bgColor) && (
                        <motion.div
                            transition={{ duration: 0.3 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <LockClosedIcon
                                className={`${chroma.contrast(bgColor, 'white') > 4.5
                                        ? 'text-white'
                                        : 'text-black'
                                    } w-3 h-3`}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div key={index}>
                {renderLayer(
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.ul
                                {...layerProps}
                                key={bgColor}
                                transition={{ duration: 0.3 }}
                                initial={{ scale: 0.9, opacity: 0.7 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="py-3 border-gray-100 border-opacity-50 shadow-lg w-32 flex flex-col items-center bg-white border rounded-md text-gray-600"
                            >
                                <li
                                    key={0}
                                    className="px-4 w-full flex items-center pt-2 pb-2 cursor-pointer text-center hover:bg-gray-100"
                                    onClick={() => copyColor()}
                                >
                                    <Square2StackIcon className="mr-1 inline w-4 h-4" /> {bgColor}
                                </li>
                                <li
                                    key={1}
                                    className={`px-4 flex justify-center w-full py-2 hover:bg-gray-100 ${pointerGrabbing ? 'cursor-grabbing' : 'cursor-grab'
                                        }`}
                                    onPointerDown={(e) => controls.start(e)}
                                >
                                    <ArrowsRightLeftIcon
                                        className="w-5 h-5"
                                    />
                                </li>
                                <li
                                    key={2}
                                    className="px-4 flex justify-center w-full py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={onLockingColor}
                                >
                                    <AnimatePresence initial={false}>
                                        <motion.div
                                            transition={{ duration: 0.5 }}
                                            initial={{ scale: 1 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            key={bgColor}
                                        >
                                            {lockColor[index] === bgColor ? (
                                                <LockClosedIcon className="w-4 h-4" />
                                            ) : (
                                                <LockOpenIcon className="w-4 h-4" />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </li>
                                {/*<li key={3} className="pb-4 cursor-pointer">*/}
                                {/*  Item 4*/}
                                {/*</li>*/}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </Reorder.Item>
    );
}

export default PopoverMenu;

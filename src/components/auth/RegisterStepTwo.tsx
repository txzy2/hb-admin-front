import {FadeIn, Hover} from '@/shared/animations';
import {Flex, IconButton, Progress, TextField} from '@radix-ui/themes';
import {LogIn, Trash2} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';

import {FileUploader} from 'react-drag-drop-files';
import {useIsAuthenticated} from '@/store/auth/auth-store';
import {useNavigate} from 'react-router-dom';

interface StepTwoProps {
  setStepRegister: (value: number) => void;
}

const fileTypes = ['SVG'];

const RegisterStepTwo: React.FC<StepTwoProps> = ({setStepRegister}) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [steps, setSteps] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      setStepRegister(1);
      navigate('/login');
    }
  }, []);

  const handleChange = (file: any) => {
    console.log(file);
    setSteps(20);
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  const handleInputChange =
    (minValue: number, maxValue: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSteps(event.target.value.length > 0 ? maxValue : minValue);

  return (
    <div className='w-full flex flex-col items-center gap-7'>
      <form className='w-[80%] xl:w-[40%] flex flex-col gap-3 text-[14px]'>
        <div className='m-auto'>
          {imageUrl ? (
            <div className='flex'>
              <FadeIn>
                <Hover scale={1.02}>
                  <div
                    className='group'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className='relative overflow-hidden'>
                      <img
                        src={imageUrl}
                        alt='Загруженное изображение'
                        className='m-auto w-[150px] h-[150px] rounded-full object-cover cursor-pointer group-hover:brightness-50'
                        title='Нажмите чтобы заменить'
                      />

                      <input
                        ref={fileInputRef}
                        type='file'
                        accept='.svg'
                        hidden
                        onChange={event => {
                          const selectedFile = event.target.files?.[0];
                          if (selectedFile) {
                            handleChange(selectedFile);
                          }
                        }}
                      />
                    </div>

                    <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 text-white group-hover:opacity-100 transition-opacity duration-200 cursor-pointer'>
                      Сменить
                    </span>
                  </div>
                </Hover>
              </FadeIn>

              <Hover scale={1.06} className='self-auto mt-auto cursor-pointer'>
                <Trash2
                  onClick={() => {
                    setSteps(0);
                    setImageUrl('');
                  }}
                  className='hover:text-[#fb923c]'
                />
              </Hover>
            </div>
          ) : (
            <FileUploader
              handleChange={handleChange}
              name='file'
              types={fileTypes}
              label={'Лого кальяной (файл .svg)'}
              classes={'drop_area'}
              multiple={false}
              uploadedLabel={file ? file.name : ''}
              maxSize={1}
            />
          )}
        </div>

        <Flex gap={'3'} justify={'between'} className='items-center'>
          <TextField.Root
            className={`w-full h-[40px] text-[14px]`}
            type='text'
            maxLength={50}
            placeholder='Название заведения'
            onChange={() => handleInputChange(20, 40)}
          >
            <TextField.Slot></TextField.Slot>
          </TextField.Root>

          <TextField.Root
            className={`w-full h-[40px] text-[14px]`}
            type={'text'}
            maxLength={24}
            onChange={() => handleInputChange(40, 50)}
          ></TextField.Root>
        </Flex>

        <TextField.Root
          className={`w-full h-[40px] text-[14px]`}
          type={'text'}
          maxLength={24}
        ></TextField.Root>

        <div className='flex items-center px-1'>
          <Hover scale={1.02} className='w-full'>
            <IconButton
              type='submit'
              className='w-full flex items-center gap-1 cursor-pointer bg-[#fb923c] text-gray-800 font-bold'
            >
              <LogIn size={18} strokeWidth={3} /> Отправить данные
            </IconButton>
          </Hover>
        </div>
      </form>

      <div className='w-[75%] flex items-center'>
        <Progress className='w-full' value={steps} />
      </div>
    </div>
  );
};

export default RegisterStepTwo;

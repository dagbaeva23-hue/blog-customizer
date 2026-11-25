import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const formRef = useRef<HTMLElement>(null);
  const arrowButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target;

      if (
        target instanceof Node &&
        !formRef.current?.contains(target) &&
        !arrowButtonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return (): void => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div ref={arrowButtonRef}>
        <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />
      </div>
      <aside className={styles.container} data-open={isOpen} ref={formRef}>
        <form className={styles.form} onReset={handleReset} onSubmit={handleSubmit}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <div className={styles.fields}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={(fontFamilyOption) =>
                setFormState((state) => ({ ...state, fontFamilyOption }))
              }
            />
            <RadioGroup
              title="Размер шрифта"
              name="font-size"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(fontSizeOption) =>
                setFormState((state) => ({ ...state, fontSizeOption }))
              }
            />
            <Separator />
            <Select
              title="Цвет текста"
              options={fontColors}
              selected={formState.fontColor}
              onChange={(fontColor) =>
                setFormState((state) => ({ ...state, fontColor }))
              }
            />
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={(backgroundColor) =>
                setFormState((state) => ({ ...state, backgroundColor }))
              }
            />
            <Separator />
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(contentWidth) =>
                setFormState((state) => ({ ...state, contentWidth }))
              }
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};

return (
  <Layout>
    <div className="min-h-screen bg-[#F1D9D2] text-[#523524] p-4 pb-20 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#853C29]">
          {language === 'en' ? 'Request a Quote' : 'Solicitar una Cotización'}
        </h1>
        <form 
          id="quotationForm"
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value={language === 'en' ? 'New quote request' : 'Nueva solicitud de cotización'} />
          {Object.keys(fieldTranslations).map((fieldName) => (
            <div key={fieldName} className="bg-white p-4 rounded-lg shadow-md">
              <FormTitleLabel htmlFor={fieldName} className="text-lg font-semibold mb-2 text-[#853C29]">
                {getFieldLabel(fieldName, language)}
              </FormTitleLabel>
              {fieldName === 'Mensaje' || fieldName === 'Descripción del Emprendimiento' || fieldName === 'Productos o Servicios' ? (
                <Textarea 
                  id={fieldName} 
                  {...methods.register(fieldName)} 
                  placeholder={placeholders[fieldName]?.[language] || ''}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                />
              ) : fieldName === 'Uso de Ilustración' ? (
                <div className="space-y-2">
                  {opcionesUsoIlustracion.map((opcion) => (
                    <div key={opcion.value} className="flex items-center">
                      <Checkbox
                        id={`${fieldName}-${opcion.value}`}
                        {...methods.register(`Uso de Ilustración.${opcion.value}`)}
                      />
                      <Label htmlFor={`${fieldName}-${opcion.value}`} className="ml-2">
                        {opcion.label[language]}
                      </Label>
                    </div>
                  ))}
                  {errors['Uso de Ilustración'] && <p className="text-red-500">{errors['Uso de Ilustración'].message}</p>}
                </div>
              ) : fieldName === 'Contenido o Mensaje' ? (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'en' 
                      ? "This is not about describing the exact idea or characters, but what is the message you would like to communicate."
                      : "No se trata de que describas la idea exacta ni los personajes, sino cuál es el mensaje que te gustaría comunicar."}
                  </p>
                  <p className="text-sm italic text-gray-600 mb-2">
                    {language === 'en'
                      ? "For example: I would like the image to convey peace, calm, silence. Something like meditative and also healing but not the typical image of Buddha meditating."
                      : "Por ejemplo: quisiera que la imagen transmita paz, calma, silencio. Algo como meditativo y también de sanación pero que no sea la típica imagen de buda meditando."}
                  </p>
                  <Textarea 
                    id={fieldName} 
                    {...methods.register(fieldName)} 
                    placeholder={placeholders[fieldName]?.[language] || ''}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                  />
                </>
              ) : fieldName === 'Palabras Clave' ? (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'en' 
                      ? "Enter up to 5 keywords that describe your project or the feeling you want to convey."
                      : "Ingrese hasta 5 palabras clave que describan su proyecto o el sentimiento que desea transmitir."}
                  </p>
                  <Input 
                    id={fieldName} 
                    {...methods.register(fieldName)} 
                    placeholder={placeholders[fieldName]?.[language] || ''}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                  />
                </>
              ) : fieldName === 'Estilo' ? (
                <StyleField 
                  language={language}
                  onFileChange={handleStyleFileChange}
                  files={styleFiles}
                  onRemoveFile={removeStyleFile}
                />
              ) : fieldName === 'ElementosGraficos' ? (
                <GraphicElements language={language} />
              ) : fieldName === 'Fecha de Entrega' ? (
                <Controller
                  control={control}
                  name="Fecha de Entrega"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText={placeholders[fieldName]?.[language] || ''}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                    />
                  )}
                />
              ) : (
                <Input 
                  id={fieldName} 
                  {...methods.register(fieldName)} 
                  placeholder={placeholders[fieldName]?.[language] || ''}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#853C29] focus:border-transparent"
                />
              )}
              {errors[fieldName] && <p className="text-red-500 mt-1">{errors[fieldName]?.message}</p>}
            </div>
          ))}
        </form>
        
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <p className="mb-2">{language === 'en' ? 'Uploading files...' : 'Subiendo archivos...'}</p>
              <Progress value={uploadProgress} className="w-64" />
            </div>
          </div>
        )}

        {isSending && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <p className="mb-2">{language === 'en' ? 'Sending form...' : 'Enviando formulario...'}</p>
              <Progress value={uploadProgress} className="w-64" />
            </div>
          </div>
        )}

        {isSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <p className="mb-2">{language === 'en' ? 'Form submitted successfully!' : '¡Formulario enviado exitosamente!'}</p>
            </div>
          </div>
        )}

        {/* Botón flotante */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <Button 
            type="submit"
            form="quotationForm"
            className="bg-kusikay-accent text-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (language === 'en' ? 'Submitting...' : 'Enviando...') 
              : (language === 'en' ? 'Submit' : 'Enviar')}
          </Button>
        </div>
      </div>
    </div>
  </Layout>
)
}
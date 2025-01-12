import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { StepsService } from './steps.service';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Get()
  findAll() {
    return this.stepsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto);
  }

}
